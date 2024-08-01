<script setup>
import { ProductService } from '@/service/ProductService';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';

const display = ref(false);
const displayConfirmation = ref(false);
const visibleLeft = ref(false);
const visibleRight = ref(false);
const visibleTop = ref(false);
const visibleBottom = ref(false);
const visibleFull = ref(false);
const products = ref(null);
const selectedProduct = ref(null);
const op = ref(null);
const op2 = ref(null);
const popup = ref(null);

const toast = useToast();
const confirmPopup = useConfirm();

onMounted(() => {
    ProductService.getProductsSmall().then((data) => (products.value = data));
});

const open = () => {
    display.value = true;
};

const close = () => {
    display.value = false;
};

const openConfirmation = () => {
    displayConfirmation.value = true;
};

const closeConfirmation = () => {
    displayConfirmation.value = false;
};

const toggle = (event) => {
    op.value.toggle(event);
};

const toggleDataTable = (event) => {
    op2.value.toggle(event);
};

const onProductSelect = (event) => {
    op.value.hide();
    toast.add({ severity: 'info', summary: 'Product Selected', detail: event.data.name, life: 3000 });
};

const confirm = (event) => {
    confirmPopup.require({
        target: event.target,
        message: 'Are you sure you want to proceed?',
        icon: 'pi pi-exclamation-triangle',
        rejectProps: {
            label: 'Cancel',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Save'
        },
        accept: () => {
            toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
        },
        reject: () => {
            toast.add({ severity: 'info', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
};
</script>

<template>
    <div class="flex flex-col md:flex-row gap-8">
        <div class="md:w-1/2">
            <div class="card">
                <div class="font-semibold text-xl mb-4">Dialog</div>
                <Dialog v-model:visible="display" :breakpoints="{ '960px': '75vw' }" :modal="true" :style="{ width: '30vw' }" header="Dialog">
                    <p class="leading-normal m-0">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    <template #footer>
                        <Button label="Save" @click="close" />
                    </template>
                </Dialog>
                <Button label="Show" style="width: auto" @click="open" />
            </div>

            <div class="card">
                <div class="font-semibold text-xl mb-4">Popover</div>
                <div class="flex flex-wrap gap-2">
                    <Button label="Show" type="button" @click="toggleDataTable" />
                    <Popover id="overlay_panel" ref="op2" style="width: 450px">
                        <DataTable v-model:selection="selectedProduct" :paginator="true" :rows="5" :value="products" selectionMode="single" @row-select="onProductSelect">
                            <Column field="name" header="Name" sortable style="min-width: 12rem"></Column>
                            <Column header="Image">
                                <template #body="slotProps">
                                    <img :alt="slotProps.data.image" :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.data.image}`" class="w-16 shadow-sm" />
                                </template>
                            </Column>
                            <Column field="price" header="Price" sortable style="min-width: 8rem">
                                <template #body="slotProps"> $ {{ slotProps.data.price }}</template>
                            </Column>
                        </DataTable>
                    </Popover>
                </div>
            </div>

            <div class="card">
                <div class="font-semibold text-xl mb-4">Tooltip</div>
                <div class="inline-flex gap-4">
                    <InputText v-tooltip="'Your username'" placeholder="Username" type="text" />
                    <Button v-tooltip="'Click to proceed'" label="Save" type="button" />
                </div>
            </div>
        </div>
        <div class="md:w-1/2">
            <div class="card">
                <div class="font-semibold text-xl mb-4">Drawer</div>
                <Drawer v-model:visible="visibleLeft" header="Drawer">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat.
                    </p>
                </Drawer>

                <Drawer v-model:visible="visibleRight" header="Drawer" position="right">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat.
                    </p>
                </Drawer>

                <Drawer v-model:visible="visibleTop" header="Drawer" position="top">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat.
                    </p>
                </Drawer>

                <Drawer v-model:visible="visibleBottom" header="Drawer" position="bottom">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat.
                    </p>
                </Drawer>

                <Drawer v-model:visible="visibleFull" header="Drawer" position="full">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat.
                    </p>
                </Drawer>

                <Button icon="pi pi-arrow-right" style="margin-right: 0.25em" @click="visibleLeft = true" />
                <Button icon="pi pi-arrow-left" style="margin-right: 0.25em" @click="visibleRight = true" />
                <Button icon="pi pi-arrow-down" style="margin-right: 0.25em" @click="visibleTop = true" />
                <Button icon="pi pi-arrow-up" style="margin-right: 0.25em" @click="visibleBottom = true" />
                <Button icon="pi pi-external-link" @click="visibleFull = true" />
            </div>

            <div class="card">
                <div class="font-semibold text-xl mb-4">ConfirmPopup</div>
                <ConfirmPopup></ConfirmPopup>
                <Button ref="popup" class="mr-2" icon="pi pi-check" label="Confirm" @click="confirm($event)"></Button>
            </div>

            <div class="card">
                <div class="font-semibold text-xl mb-4">ConfirmDialog</div>
                <Button icon="pi pi-trash" label="Delete" severity="danger" style="width: auto" @click="openConfirmation" />
                <Dialog v-model:visible="displayConfirmation" :modal="true" :style="{ width: '350px' }" header="Confirmation">
                    <div class="flex items-center justify-center">
                        <i class="pi pi-exclamation-triangle mr-4" style="font-size: 2rem" />
                        <span>Are you sure you want to proceed?</span>
                    </div>
                    <template #footer>
                        <Button icon="pi pi-times" label="No" severity="secondary" text @click="closeConfirmation" />
                        <Button autofocus icon="pi pi-check" label="Yes" outlined severity="danger" @click="closeConfirmation" />
                    </template>
                </Dialog>
            </div>
        </div>
    </div>
</template>
