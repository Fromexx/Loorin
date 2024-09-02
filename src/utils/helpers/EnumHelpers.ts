export function GetEnumValue<T>(collection: any, enumKey: T) {
    for (const [key, value] of Object.entries(collection)) {
        if (key === enumKey) {
            return value as string;
        }
    }
}

export function GetEnumKey<T>(collection: any, enumValue: T) {
    for (const [key, value] of Object.entries(collection)) {
        if (value === enumValue) {
            return key as string;
        }
    }
}