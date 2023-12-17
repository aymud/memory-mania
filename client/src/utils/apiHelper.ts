interface ErrorType {
    message: string
}

export async function tryFetchData(
    apiUrl: string,
    options: NonNullable<unknown> = {}
) {
    try {
        const response = await fetch(apiUrl, options)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }
        return await response.json()
    } catch (error) {
        const typedError = error as ErrorType
        throw new Error(`Error fetching data: ${typedError.message}`)
    }
}