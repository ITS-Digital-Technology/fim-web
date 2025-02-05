import useFetch from "@/hooks/useFetch";
import { apiPath, baseUrl } from "@/src/apiConfig";
import { User, Employment, WorkProfile } from "@/types/User";
import {
  createContext,
  useMemo,
  useState,
  useContext,
  JSX,
} from "react";
import { AppContext } from "./AppContext";
import { jwtDecode } from "@/utils/jwt";

export interface UserContextProps {
  user: User | undefined;
  employment: Employment | undefined;
  workProfile: WorkProfile | undefined;
  fetchUserData: () => void;
  fetchEmploymentData: () => void;
  fetchWorkProfileData: () => void;
  isLoading: boolean;
  isError: boolean;
}

export const UserContext = createContext<UserContextProps>(
  {} as UserContextProps
);

export const UserProvider = ({ children }: { children: JSX.Element }) => {
  const { MStoken } = useContext(AppContext);
  const decodedJwt = jwtDecode(MStoken);

  // 缓存数据
  const [user, setUser] = useState<User | undefined>(undefined);
  const [employment, setEmployment] = useState<Employment | undefined>(undefined);
  const [workProfile, setWorkProfile] = useState<WorkProfile | undefined>(undefined);

  // Fetch Hooks
  const {
    fetchAPI: GetUserDetails,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useFetch<User>({
    dataType: "json",
    url: `${baseUrl}${apiPath.GetUserDetails}`,
    disableAutoFetch: true, // 只在需要时请求
  });

  const {
    fetchAPI: GetUserEmployment,
    isLoading: isEmploymentLoading,
    isError: isEmploymentError,
  } = useFetch<Employment>({
    dataType: "json",
    url: `${baseUrl}${apiPath.Employment}`,
    disableAutoFetch: true,
  });

  const {
    fetchAPI: GetWorkProfile,
    isLoading: isWorkProfileLoading,
    isError: isWorkProfileError,
  } = useFetch<WorkProfile>({
    dataType: "json",
    url: `${baseUrl}${apiPath.GetWorkProfile}`,
    disableAutoFetch: true,
  });

  // **手动触发 Fetch，并缓存数据**
  const fetchUserData = async () => {
    if (!user) {
      try {
        const data = await GetUserDetails();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    }
  };

  const fetchEmploymentData = async () => {
    if (!employment) {
      try {
        const data = await GetUserEmployment();
        setEmployment(data);
      } catch (error) {
        console.error("Error fetching employment details:", error);
      }
    }
  };

  const fetchWorkProfileData = async () => {
    if (!workProfile) {
      try {
        const data = await GetWorkProfile();
        setWorkProfile(data);
        console.log("workProfileData:", workProfile);

      } catch (error) {
        console.error("Error fetching work profile:", error);
      }
    }
  };

  // **合并 Context 数据**
  const userProps: UserContextProps = useMemo(
    () => ({
      user,
      employment,
      workProfile,
      fetchUserData,
      fetchEmploymentData,
      fetchWorkProfileData,
      isLoading: isUserLoading || isEmploymentLoading || isWorkProfileLoading,
      isError: isUserError || isEmploymentError || isWorkProfileError,
    }),
    [
      user,
      employment,
      workProfile,
      isUserLoading,
      isEmploymentLoading,
      isWorkProfileLoading,
      isUserError,
      isEmploymentError,
      isWorkProfileError,
    ]
  );

  return (
    <UserContext.Provider value={userProps}>{children}</UserContext.Provider>
  );
};
