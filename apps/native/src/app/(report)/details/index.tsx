import { Header } from "@/components/general/header";
import { EditIcon, ImageIcon, MicIcon, ProfileIcon } from "@zennui/icons";
import { Text } from "@zennui/native/text";
import { H1, H3 } from "@zennui/native/typography";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useScannedInfo } from "@/components/providers/scanned-info";
import { Image } from "expo-image";
import { Button } from "@zennui/native/button";
import { api } from "@junction/provider/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useRouter } from "expo-router";

export const retrieveDataFromScannedText = (text = "") => {
  // Convert to uppercase and clean up text
  const cleanText = text.toUpperCase().replace(/\s+/g, " ").trim();
  const lines = cleanText.split(/[\n\r]+/);

  const result: Partial<{
    title: string;
    serialNumber: string;
    model: string;
    weight: number;
    checkedBy: string;
    checkedAt: number;
    note: string;
    location: string;
  }> = {};

  // Regular expressions for common patterns
  const patterns = {
    serialNumber:
      /(?:SERIAL(?:\s+)?(?:NO|NUMBER|#)?[:.\s]+)?((?:[A-Z0-9]-?){4,})/i,
    model:
      /(?:MODEL(?:\s+)?(?:NO|NUMBER|#)?[:.\s]+)?([A-Z0-9-]+(?:\s+[A-Z0-9-]+)*)/i,
    weight:
      /(?:(?:MAX(?:IMUM)?|RATED)\s+)?(?:WEIGHT|LOAD|CAPACITY)[:.\s]+(\d+(?:[,.]\d+)?)\s*(?:KG|LBS?)?/i,
    checkedDate:
      /(?:(?:LAST\s+)?(?:CHECK(?:ED)?|INSPECT(?:ED|ION))[:.\s]+)?((?:\d{1,2}[-/]\d{1,2}[-/]\d{2,4})|(?:\d{2,4}[-/]\d{1,2}[-/]\d{1,2}))/i,
    checkedBy:
      /(?:(?:CHECK(?:ED)?|INSPECT(?:ED)?)\s+BY[:.\s]+)([A-Z\s]+(?:\s+[A-Z]+)*)/i,
  };

  // Helper function to extract data using regex
  const extractData = (
    pattern: RegExp,
    text: string,
  ): string | null | undefined => {
    const match = text.match(pattern);
    return match ? match[1] : null;
  };

  // Process each line
  for (const line of lines) {
    // Try to identify the title (usually first line containing "ELEVATOR" or "ESCALATOR")
    if (!result.title && /(?:ELEVATOR|ESCALATOR|LIFT)/i.test(line)) {
      result.title = line.trim();
      continue;
    }

    // Extract serial number
    if (!result.serialNumber) {
      const serialNumber = extractData(patterns.serialNumber, line);
      if (serialNumber) {
        result.serialNumber = serialNumber;
      }
    }

    // Extract model
    if (!result.model) {
      const model = extractData(patterns.model, line);
      if (model && !/^(SERIAL|WEIGHT|CHECK)/i.test(model)) {
        result.model = model;
      }
    }

    // Extract weight
    if (!result.weight) {
      const weight = extractData(patterns.weight, line);
      if (weight) {
        result.weight = Number.parseFloat(weight.replace(",", ""));
      }
    }

    // Extract checked by
    if (!result.checkedBy) {
      const checkedBy = extractData(patterns.checkedBy, line);
      if (checkedBy) {
        result.checkedBy = checkedBy.trim();
      }
    }

    // Extract checked date
    if (!result.checkedAt) {
      const checkedDate = extractData(patterns.checkedDate, line);
      if (checkedDate) {
        // Convert date string to timestamp
        const dateParts = checkedDate.split(/[-/]/);
        if (dateParts.length === 3) {
          let [year, month, day] = dateParts;

          // Handle 2-digit year
          if (year?.length === 2) {
            year = `20${year}`;
          }

          const date = new Date(
            Number.parseInt(year ?? "2022"),
            Number.parseInt(month ?? "1") - 1,
            Number.parseInt(day ?? "1"),
          );
          result.checkedAt = date.getTime();
        }
      }
    }

    // Try to identify location information
    if (!result.location && /(?:LOCATION|FLOOR|LEVEL|BUILDING)/i.test(line)) {
      result.location = line
        .replace(/^(?:LOCATION|FLOOR|LEVEL|BUILDING)[:.\s]+/i, "")
        .trim();
    }

    // Look for notes (usually contains words like "NOTE", "WARNING", "CAUTION")
    if (!result.note && /(?:NOTE|WARNING|CAUTION|ATTENTION)/i.test(line)) {
      result.note = line.trim();
    }
  }

  return {
    model: "Machine KM",
    weight: "188KG",
    serialNumber: "51027550V102",
    manufacturer: "Kone",
    checkedBy: "John Doe",
    ...result,
  };
};

export default () => {
  const { top, bottom } = useSafeAreaInsets();
  const [output = {}] = useScannedInfo();

  const saveReport = useMutation(api.services.report.saveReport);
  const data = retrieveDataFromScannedText(output.scannedValue);
  const surveys = useQuery(api.services.survey.getAllSurveys, {});

  const router = useRouter();

  return (
    <>
      <Header title={"Check Details"} />
      <ScrollView
        contentContainerClassName="pb-72"
        style={{ paddingTop: top + 60 }}
      >
        <View className="gap-4 px-6">
          <View className="gap-1">
            <H1 style={{ fontFamily: "RFDewiExtended-Bold" }}>
              {output.title ?? "Lidl Helsinki 2"}
            </H1>
          </View>
          <View className="flex-row items-center gap-2 border-border border-t pt-4">
            <View className="pb-2">
              <ProfileIcon className="size-8 text-primary" />
            </View>
            <View className="flex-1 flex-row items-center gap-2 border-border border-b pb-2">
              <Text className="flex-1 text-2xl text-primary">Details</Text>
              <EditIcon className="size-7 text-foreground-dimmed" />
            </View>
          </View>
          <View className="ml-12 flex-1 flex-row items-center justify-between gap-2 border-border border-b pb-2">
            <Text className="text-foreground-dimmed text-xl">Manufacturer</Text>
            <Text className="text-foreground-dimmed text-xl">
              {data.manufacturer}
            </Text>
          </View>
          <View className="ml-12 flex-1 flex-row items-center justify-between gap-2 border-border border-b pb-2">
            <Text className="text-foreground-dimmed text-xl">Model</Text>
            <Text className="text-foreground-dimmed text-xl">{data.model}</Text>
          </View>
          <View className="ml-12 flex-1 flex-row items-center justify-between gap-2 border-border border-b pb-2">
            <Text className="text-foreground-dimmed text-xl">Serial ID</Text>
            <Text className="text-foreground-dimmed text-xl">
              {data.serialNumber}
            </Text>
          </View>
          <View className="ml-12 flex-1 flex-row items-center justify-between gap-2 pb-2">
            <Text className="text-foreground-dimmed text-xl">Weight</Text>
            <Text className="text-foreground-dimmed text-xl">
              {data.weight}
            </Text>
          </View>
          <View className="flex-row items-center gap-2 border-border border-t pt-4">
            <View className="pb-2">
              <MicIcon className="size-8 text-primary" />
            </View>
            <View className="flex-1 flex-row items-center gap-2 border-border border-b pb-2">
              <Text className="flex-1 text-2xl text-primary">Expertise</Text>
              <EditIcon className="size-7 text-foreground-dimmed" />
            </View>
          </View>
          <View className="ml-12 flex-1 flex-row items-center justify-start gap-2 pb-2">
            <Text className="text-foreground-dimmed text-xl">
              {output?.voiceValue ?? "No expertise"}
            </Text>
          </View>
          <View className="flex-row items-center gap-2 border-border border-t pt-4">
            <View className="pb-2">
              <ImageIcon className="size-8 text-primary" />
            </View>
            <View className="flex-1 flex-row items-center gap-2 border-border border-b pb-2">
              <Text className="flex-1 text-2xl text-primary">
                Scanned Image
              </Text>
              <EditIcon className="size-7 text-foreground-dimmed" />
            </View>
          </View>
          <View className="ml-12 flex-1 flex-row items-center justify-start gap-2 pb-2">
            <Image
              source={{
                uri: `data:image/jpeg;base64,${output.photoBase64}`,
              }}
              className="w-full h-52 rounded-lg"
            />
          </View>
        </View>
      </ScrollView>

      <Button
        onPress={async () => {
          if (!output.scannedValue) return;
          try {
            await saveReport(
              data as unknown as Parameters<typeof saveReport>[0],
            );
          } catch (error) {
            console.log("error", error);
          }
          const url = surveys?.[0]?._id;
          if (!url) return;
          router.push(`/survey/${encodeURIComponent(url)}`);
        }}
        color={"primary"}
        className="absolute self-center mb-6 w-full w-[90%]"
        style={{ bottom }}
      >
        <H3 className={"text-white text-2xl font-normal"}>
          Save Entry into Latest Survey
        </H3>
      </Button>
    </>
  );
};
