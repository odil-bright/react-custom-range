import { apiGet } from "@/api/api";
import { endpoints } from "@/models/api";


export async function getPriceRange() {
    const result = await apiGet(endpoints.range)
    return result
}

export async function getPriceSteps() {
    const result = await apiGet(endpoints.steps)
    return result
}