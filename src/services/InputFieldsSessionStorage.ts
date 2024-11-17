export function SaveInput(name: string, value: string) {
    window.sessionStorage.setItem(name, value);
}

export function GetInput(name: string) {
    return window.sessionStorage.getItem(name);
}