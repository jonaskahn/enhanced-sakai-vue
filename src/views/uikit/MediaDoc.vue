<script setup>
import { PhotoService } from '@/service/PhotoService';
import { ProductService } from '@/service/ProductService';
import { onMounted, ref } from 'vue';

const products = ref([]);
const images = ref([]);
const galleriaResponsiveOptions = ref([
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '960px',
        numVisible: 4
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
]);
const carouselResponsiveOptions = ref([
    {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
    },
    {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
    },
    {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
    }
]);

onMounted(() => {
    ProductService.getProductsSmall().then((data) => (products.value = data));
    PhotoService.getImages().then((data) => (images.value = data));
});

function getSeverity(status) {
    switch (status) {
        case 'INSTOCK':
            return 'success';

        case 'LOWSTOCK':
            return 'warning';

        case 'OUTOFSTOCK':
            return 'danger';

        default:
            return null;
    }
}
</script>

<template>
    <div class="card">
        <div class="font-semibold text-xl mb-4">Carousel</div>
        <Carousel :numScroll="3" :numVisible="3" :responsiveOptions="carouselResponsiveOptions" :value="products">
            <template #item="slotProps">
                <div class="border border-surface-200 dark:border-surface-700 rounded m-2 p-4">
                    <div class="mb-4">
                        <div class="relative mx-auto">
                            <img :alt="slotProps.data.name" :src="'https://primefaces.org/cdn/primevue/images/product/' + slotProps.data.image" class="w-full rounded" />
                            <div class="dark:bg-surface-900 absolute rounded-border" style="left: 5px; top: 5px">
                                <Tag :severity="getSeverity(slotProps.data.inventoryStatus)" :value="slotProps.data.inventoryStatus" />
                            </div>
                        </div>
                    </div>
                    <div class="mb-4 font-medium">{{ slotProps.data.name }}</div>
                    <div class="flex justify-between items-center">
                        <div class="mt-0 font-semibold text-xl">${{ slotProps.data.price }}</div>
                        <span>
                            <Button icon="pi pi-heart" outlined severity="secondary" />
                            <Button class="ml-2" icon="pi pi-shopping-cart" />
                        </span>
                    </div>
                </div>
            </template>
        </Carousel>
    </div>

    <div class="card">
        <div class="font-semibold text-xl mb-4">Image</div>
        <Image alt="Image" src="https://primefaces.org/cdn/primevue/images/galleria/galleria10.jpg" width="250" />
    </div>

    <div class="card">
        <div class="font-semibold text-xl mb-4">Galleria</div>
        <Galleria :numVisible="5" :responsiveOptions="galleriaResponsiveOptions" :value="images" containerStyle="max-width: 640px">
            <template #item="slotProps">
                <img :alt="slotProps.item.alt" :src="slotProps.item.itemImageSrc" style="width: 100%" />
            </template>
            <template #thumbnail="slotProps">
                <img :alt="slotProps.item.alt" :src="slotProps.item.thumbnailImageSrc" />
            </template>
        </Galleria>
    </div>
</template>
