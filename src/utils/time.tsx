import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

const PSTCampuses = ['vancouver', 'oakland', 'seattle', 'silicon valley']

export const getTimezone = (campus: string) => {
    dayjs.extend(utc)
    dayjs.extend(timezone)

    if (campus === 'london') {
        return dayjs().tz('Europe/London')
    } else if (PSTCampuses.indexOf(campus) !== -1) {
        // All PST timezones should match with vancouver
        return dayjs().tz('America/Vancouver')
    }

    // default to EST
    return dayjs().tz('America/New_York')
}

export const getGreeting = (location: string): string => {
    const currentTime = getTimezone(location).hour()
    if (currentTime >= 0 && currentTime < 12) {
        return 'GOOD MORNING'
    } else if (currentTime >= 12 && currentTime < 17) {
        return 'GOOD AFTERNOON'
    } else {
        return 'GOOD EVENING'
    }
}
