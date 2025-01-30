// 'use client'

// import { useEffect, useMemo, useState, useContext } from 'react'
// import { apiPath, baseUrl } from '@/src/apiConfig'
// // import {
// //     StudentInfoV2,
// //     MealPlan,
// //     StudentBillingV2,
// //     StudentTermsV2,
// //     UserDetails,
// // } from '@/types/Student'
// import { User } from '../types/User'
// import { CachingOpts } from '../utils/cached'
// import useFetch from '../hooks/useFetch'
// import { AppContext } from '@/app/contexts/AppContext'
// const defaultCampus = 'Boston'
// const defaultWeatherLoc = 'Boston,MA,US'

// const caching: CachingOpts = { scenario: 'long-lived' }

// export type UserInfo = {
//     user?: User
//     campusName: string
//     isError: boolean
//     isLoading: boolean
//     weatherLoc: string
// }

// export const useUserInfo = (): UserInfo => {
//     const [user, setUser] = useState<User>()
//     const [isError, setIsError] = useState(false)
//     const { MStoken, BEtoken} =
//         useContext(AppContext)

//     const {
//         data: userDetails,
//         isError: isErrorUserDetails,
//         isLoading: isLoadingUserDetails,
//     } = useFetch<UserDetails>({
//         url: `${baseUrl}${apiPath.GetUserDetails}`,
//         dataType: 'json',
//         caching,
//     })

//     const {
//         data: studentInfo,
//         fetchAPI: fetchStudentInfo,
//         isError: isErrorStudentInfo,
//     } = useFetch<IValidatableApiResponse<StudentInfoV2>>({
//         url: `${baseUrl}${apiPath.GetStudentInfoV2}`,
//         disableAutoFetch: true,
//         caching,
//     })



 

//     useEffect(
//         () => {
//             if (userDetails) {
//                 fetchStudentInfo()
//             }
//         },
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//         [userDetails]
//     )

//     useEffect(() => {
//         const isError =
//             isErrorUserDetails ||
//             isErrorStudentInfo ||
//             studentInfo?.isValid === false
//         setIsError(isError)

//         if (!isError && userDetails) {
//             setUser({
//                 nuid: userDetails?.nuid ?? '',
//                 userId: userDetails?.userId ?? '',
//                 firstName: studentInfo?.value?.firstName ?? '',
//                 lastName: studentInfo?.value?.lastName ?? '',
    
//             })
//         }
//     }, [
//         isErrorUserDetails,
//         isErrorStudentInfo,
//         userDetails,
//         studentInfo,
       
//     ])

//     const campusName = useMemo(
//         () => (studentInfo?.value?.campus ?? defaultCampus).toLocaleLowerCase(),
//         [studentInfo?.value?.campus]
//     )
//     const weatherLoc = useMemo(
//         () => (studentInfo?.value?.weatherLocation ?? defaultWeatherLoc).toLocaleLowerCase(),
//         [studentInfo?.value?.weatherLocation]
//     )
//     return {
//         user,
//         campusName,
//         weatherLoc,
//         isLoading: isLoadingUserDetails,
//         isError,
//     }
// }

