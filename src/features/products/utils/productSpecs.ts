import type { ProductDetails } from "../types/Product";

export function formatProdductSpecs(product: ProductDetails) {
    const specsConfig = [
        { label: 'Screen', value: product.screen },
        { label: 'Resolution', value: product.resolution },
        { label: 'Processor', value: product.processor },
        { label: 'RAM', value: product.ram },
        { label: 'Built in memory', value: product.capacity },
        { label: 'Camera', value: product.camera },
        { label: 'Zoom', value: product.zoom },
        {
            label: 'Cell',
            value: Array.isArray(product.cell) ? product.cell.join(', ') : product.cell
        },
    ];

    return specsConfig.filter(spec => spec.value);
}