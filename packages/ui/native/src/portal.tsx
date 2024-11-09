import {
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import type { View, ViewStyle } from "react-native";
import { create } from "zustand";

const DEFAULT_PORTAL_HOST = "INTERNAL_PRIMITIVE_DEFAULT_HOST_NAME";

type PortalMap = Map<string, ReactNode>;
type PortalHostMap = Map<string, PortalMap>;

const usePortal = create<{ map: PortalHostMap }>(() => ({
  map: new Map<string, PortalMap>().set(
    DEFAULT_PORTAL_HOST,
    new Map<string, React.ReactNode>(),
  ),
}));

const updatePortal = (hostName: string, name: string, children: ReactNode) => {
  usePortal.setState((prev) => {
    const next = new Map(prev.map);
    const portal = next.get(hostName) ?? new Map<string, React.ReactNode>();
    portal.set(name, children);
    next.set(hostName, portal);
    return { map: next };
  });
};
const removePortal = (hostName: string, name: string) => {
  usePortal.setState((prev) => {
    const next = new Map(prev.map);
    const portal = next.get(hostName) ?? new Map<string, React.ReactNode>();
    portal.delete(name);
    next.set(hostName, portal);
    return { map: next };
  });
};

export type PortalHostProps = { name?: string };
export const PortalHost = ({ name = DEFAULT_PORTAL_HOST }: PortalHostProps) => {
  const portalMap =
    usePortal((state) => state.map).get(name) ??
    new Map<string, React.ReactNode>();
  if (portalMap.size === 0) return null;
  return <>{Array.from(portalMap.values())}</>;
};

export type PortalProps = {
  name: string;
  hostName?: string;
  children: React.ReactNode;
};

export const Portal = ({
  name,
  hostName = DEFAULT_PORTAL_HOST,
  children,
}: PortalProps) => {
  useEffect(() => {
    updatePortal(hostName, name, children);
  }, [hostName, name, children]);

  useEffect(() => {
    return () => {
      removePortal(hostName, name);
    };
  }, [hostName, name]);

  return null;
};

const ROOT: ViewStyle = {
  flex: 1,
};

export const useModalPortalRoot = () => {
  const ref = useRef<View>(null);
  const [sideOffset, setSideOffSet] = useState(0);

  const onLayout = useCallback(() => {
    ref.current?.measure((_x, _y, _width, _height, _pageX, pageY) => {
      setSideOffSet(-pageY);
    });
  }, []);

  return {
    ref,
    sideOffset,
    onLayout,
    style: ROOT,
  };
};
