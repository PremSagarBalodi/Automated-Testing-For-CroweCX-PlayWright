export const stringFormat = (str: string, ...args: string[]) =>
    str.replace(/{(\d+)}/g, (match: any, index: any) => args[index].toString() || "");