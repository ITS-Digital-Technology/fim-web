// "use client";

// import { useEffect, useMemo, useState, useContext } from "react";
// import { apiPath, baseUrl } from "@/src/apiConfig";
// // import {
// //     StudentInfoV2,
// //     MealPlan,
// //     StudentBillingV2,
// //     StudentTermsV2,
// //     UserDetails,
// // } from '@/types/Student'
// import { User } from "../types/User";
// import { CachingOpts } from "../utils/cached";
// import useFetch from "../hooks/useFetch";
// import { AppContext } from "@/app/contexts/AppContext";

// const caching: CachingOpts = { scenario: "long-lived" };

// export type UserInfo = {
//   user?: User;
//   isError: boolean;
//   isLoading: boolean;
// };

// export const useUserInfo = (): UserInfo => {
//   const [user, setUser] = useState<User>();
//   const [isError, setIsError] = useState(false);
// //   const { MStoken, BEtoken } = useContext(AppContext);

//   const {
//     data: userDetails,
//     isError: isErrorUserDetails,
//     isLoading: isLoadingUserDetails,
//     fetchAPI: GetUserDetails 
//   } = useFetch<User>({
//     url: `${baseUrl}${apiPath.GetUserDetails}`,
//     dataType: "json",
//     caching,
//   });

//   useEffect(
//       () => {
//           if (userDetails) {
//             GetUserDetails()
//           }
//       },
//       // eslint-disable-next-line react-hooks/exhaustive-deps
//       [userDetails]
//   )

//   useEffect(() => {
//     const isError = isErrorUserDetails;
//     setIsError(isError);

//     if (!isError && userDetails) {
//       setUser({
//         nuId: userDetails?.nuId ?? "",
//         firstName: userDetails?.firstName ?? "",
//         lastName: userDetails?.lastName ?? "",
//         prefix: userDetails.prefix??"",
//         email: userDetails.email,
//         displayName: userDetails.displayName,
//         shortDescription: userDetails.shortDescription,
//         academicTitle: userDetails.academicTitle,
//         biography:userDetails.biography,
//         accomplishments:userDetails.accomplishments

//       });
//     }
//   }, [isErrorUserDetails, userDetails]);

//   return {
//     user,
//     isLoading: isLoadingUserDetails,
//     isError,
//   };
// };
