<script setup>
import { CustomerService } from '@/service/CustomerService';
import { ProductService } from '@/service/ProductService';
import { FilterMatchMode, FilterOperator } from '@primevue/core/api';
import { onBeforeMount, reactive, ref } from 'vue';

const customers1 = ref(null);
const customers2 = ref(null);
const customers3 = ref(null);
const filters1 = ref(null);
const loading1 = ref(null);
const balanceFrozen = ref(false);
const products = ref(null);
const expandedRows = ref([]);
const statuses = reactive(['unqualified', 'qualified', 'new', 'negotiation', 'renewal', 'proposal']);
const representatives = reactive([
    { name: 'Amy Elsner', image: 'amyelsner.png' },
    { name: 'Anna Fali', image: 'annafali.png' },
    { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
    { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
    { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
    { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
    { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
    { name: 'Onyama Limba', image: 'onyamalimba.png' },
    { name: 'Stephen Shaw', image: 'stephenshaw.png' },
    { name: 'XuXue Feng', image: 'xuxuefeng.png' }
]);

function getOrderSeverity(order) {
    switch (order.status) {
        case 'DELIVERED':
            return 'success';

        case 'CANCELLED':
            return 'danger';

        case 'PENDING':
            return 'warn';

        case 'RETURNED':
            return 'info';

        default:
            return null;
    }
}

function getSeverity(status) {
    switch (status) {
        case 'unqualified':
            return 'danger';

        case 'qualified':
            return 'success';

        case 'new':
            return 'info';

        case 'negotiation':
            return 'warn';

        case 'renewal':
            return null;
    }
}

function getStockSeverity(product) {
    switch (product.inventoryStatus) {
        case 'INSTOCK':
            return 'success';

        case 'LOWSTOCK':
            return 'warn';

        case 'OUTOFSTOCK':
            return 'danger';

        default:
            return null;
    }
}

onBeforeMount(() => {
    ProductService.getProductsWithOrdersSmall().then((data) => (products.value = data));
    CustomerService.getCustomersLarge().then((data) => {
        customers1.value = data;
        loading1.value = false;
        customers1.value.forEach((customer) => (customer.date = new Date(customer.date)));
    });
    CustomerService.getCustomersLarge().then((data) => (customers2.value = data));
    CustomerService.getCustomersMedium().then((data) => (customers3.value = data));

    initFilters1();
});

function initFilters1() {
    filters1.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'country.name': {
            operator: FilterOperator.AND,
            constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
        },
        representative: { value: null, matchMode: FilterMatchMode.IN },
        date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
        balance: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        activity: { value: [0, 100], matchMode: FilterMatchMode.BETWEEN },
        verified: { value: null, matchMode: FilterMatchMode.EQUALS }
    };
}

function expandAll() {
    expandedRows.value = products.value.reduce((acc, p) => (acc[p.id] = true) && acc, {});
}

function collapseAll() {
    expandedRows.value = null;
}

function formatCurrency(value) {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

function formatDate(value) {
    return value.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

function calculateCustomerTotal(name) {
    let total = 0;
    if (customers3.value) {
        for (let customer of customers3.value) {
            if (customer.representative.name === name) {
                total++;
            }
        }
    }

    return total;
}
</script>

<template>
    <div class="card">
        <div class="font-semibold text-xl mb-4">Filtering</div>
        <DataTable
            v-model:filters="filters1"
            :filters="filters1"
            :globalFilterFields="['name', 'country.name', 'representative.name', 'balance', 'status']"
            :loading="loading1"
            :paginator="true"
            :rowHover="true"
            :rows="10"
            :value="customers1"
            dataKey="id"
            filterDisplay="menu"
            showGridlines
        >
            <template #header>
                <div class="flex justify-between">
                    <Button icon="pi pi-filter-slash" label="Clear" outlined type="button" @click="clearFilter()" />
                    <IconField>
                        <InputIcon>
                            <i class="pi pi-search" />
                        </InputIcon>
                        <InputText v-model="filters1['global'].value" placeholder="Keyword Search" />
                    </IconField>
                </div>
            </template>
            <template #empty> No customers found.</template>
            <template #loading> Loading customers data. Please wait.</template>
            <Column field="name" header="Name" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.name }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" placeholder="Search by name" type="text" />
                </template>
            </Column>
            <Column filterField="country.name" header="Country" style="min-width: 12rem">
                <template #body="{ data }">
                    <div class="flex items-center gap-2">
                        <img :class="`flag flag-${data.country.code}`" alt="flag" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" style="width: 24px" />
                        <span>{{ data.country.name }}</span>
                    </div>
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" placeholder="Search by country" type="text" />
                </template>
                <template #filterclear="{ filterCallback }">
                    <Button icon="pi pi-times" severity="secondary" type="button" @click="filterCallback()"></Button>
                </template>
                <template #filterapply="{ filterCallback }">
                    <Button icon="pi pi-check" severity="success" type="button" @click="filterCallback()"></Button>
                </template>
            </Column>
            <Column :filterMenuStyle="{ width: '14rem' }" :showFilterMatchModes="false" filterField="representative" header="Agent" style="min-width: 14rem">
                <template #body="{ data }">
                    <div class="flex items-center gap-2">
                        <img :alt="data.representative.name" :src="`https://primefaces.org/cdn/primevue/images/avatar/${data.representative.image}`" style="width: 32px" />
                        <span>{{ data.representative.name }}</span>
                    </div>
                </template>
                <template #filter="{ filterModel }">
                    <MultiSelect v-model="filterModel.value" :options="representatives" optionLabel="name" placeholder="Any">
                        <template #option="slotProps">
                            <div class="flex items-center gap-2">
                                <img :alt="slotProps.option.name" :src="`https://primefaces.org/cdn/primevue/images/avatar/${slotProps.option.image}`" style="width: 32px" />
                                <span>{{ slotProps.option.name }}</span>
                            </div>
                        </template>
                    </MultiSelect>
                </template>
            </Column>
            <Column dataType="date" filterField="date" header="Date" style="min-width: 10rem">
                <template #body="{ data }">
                    {{ formatDate(data.date) }}
                </template>
                <template #filter="{ filterModel }">
                    <DatePicker v-model="filterModel.value" dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" />
                </template>
            </Column>
            <Column dataType="numeric" filterField="balance" header="Balance" style="min-width: 10rem">
                <template #body="{ data }">
                    {{ formatCurrency(data.balance) }}
                </template>
                <template #filter="{ filterModel }">
                    <InputNumber v-model="filterModel.value" currency="USD" locale="en-US" mode="currency" />
                </template>
            </Column>
            <Column :filterMenuStyle="{ width: '14rem' }" field="status" header="Status" style="min-width: 12rem">
                <template #body="{ data }">
                    <Tag :severity="getSeverity(data.status)" :value="data.status" />
                </template>
                <template #filter="{ filterModel }">
                    <Select v-model="filterModel.value" :options="statuses" placeholder="Select One" showClear>
                        <template #option="slotProps">
                            <Tag :severity="getSeverity(slotProps.option)" :value="slotProps.option" />
                        </template>
                    </Select>
                </template>
            </Column>
            <Column :showFilterMatchModes="false" field="activity" header="Activity" style="min-width: 12rem">
                <template #body="{ data }">
                    <ProgressBar :showValue="false" :value="data.activity" style="height: 6px"></ProgressBar>
                </template>
                <template #filter="{ filterModel }">
                    <Slider v-model="filterModel.value" class="m-4" range></Slider>
                    <div class="flex items-center justify-between px-2">
                        <span>{{ filterModel.value ? filterModel.value[0] : 0 }}</span>
                        <span>{{ filterModel.value ? filterModel.value[1] : 100 }}</span>
                    </div>
                </template>
            </Column>
            <Column bodyClass="text-center" dataType="boolean" field="verified" header="Verified" style="min-width: 8rem">
                <template #body="{ data }">
                    <i :class="{ 'pi-check-circle text-green-500 ': data.verified, 'pi-times-circle text-red-500': !data.verified }" class="pi"></i>
                </template>
                <template #filter="{ filterModel }">
                    <label class="font-bold" for="verified-filter"> Verified </label>
                    <Checkbox v-model="filterModel.value" :indeterminate="filterModel.value === null" binary inputId="verified-filter" />
                </template>
            </Column>
        </DataTable>
    </div>

    <div class="card">
        <div class="font-semibold text-xl mb-4">Frozen Columns</div>
        <ToggleButton v-model="balanceFrozen" offIcon="pi pi-lock-open" offLabel="Balance" onIcon="pi pi-lock" onLabel="Balance" />

        <DataTable :value="customers2" class="mt-6" scrollHeight="400px" scrollable>
            <Column class="font-bold" field="name" frozen header="Name" style="min-width: 200px"></Column>
            <Column field="id" header="Id" style="min-width: 100px"></Column>
            <Column field="name" header="Name" style="min-width: 200px"></Column>
            <Column field="country.name" header="Country" style="min-width: 200px"></Column>
            <Column field="date" header="Date" style="min-width: 200px"></Column>
            <Column field="company" header="Company" style="min-width: 200px"></Column>
            <Column field="status" header="Status" style="min-width: 200px"></Column>
            <Column field="activity" header="Activity" style="min-width: 200px"></Column>
            <Column field="representative.name" header="Representative" style="min-width: 200px"></Column>
            <Column :frozen="balanceFrozen" alignFrozen="right" field="balance" header="Balance" style="min-width: 200px">
                <template #body="{ data }">
                    <span class="font-bold">{{ formatCurrency(data.balance) }}</span>
                </template>
            </Column>
        </DataTable>
    </div>

    <div class="card">
        <div class="font-semibold text-xl mb-4">Row Expansion</div>
        <DataTable v-model:expandedRows="expandedRows" :value="products" dataKey="id" tableStyle="min-width: 60rem">
            <template #header>
                <div class="flex flex-wrap justify-end gap-2">
                    <Button icon="pi pi-plus" label="Expand All" text @click="expandAll" />
                    <Button icon="pi pi-minus" label="Collapse All" text @click="collapseAll" />
                </div>
            </template>
            <Column expander style="width: 5rem" />
            <Column field="name" header="Name"></Column>
            <Column header="Image">
                <template #body="slotProps">
                    <img :alt="slotProps.data.image" :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.data.image}`" class="shadow-lg" width="64" />
                </template>
            </Column>
            <Column field="price" header="Price">
                <template #body="slotProps">
                    {{ formatCurrency(slotProps.data.price) }}
                </template>
            </Column>
            <Column field="category" header="Category"></Column>
            <Column field="rating" header="Reviews">
                <template #body="slotProps">
                    <Rating :modelValue="slotProps.data.rating" readonly />
                </template>
            </Column>
            <Column header="Status">
                <template #body="slotProps">
                    <Tag :severity="getStockSeverity(slotProps.data)" :value="slotProps.data.inventoryStatus" />
                </template>
            </Column>
            <template #expansion="slotProps">
                <div class="p-4">
                    <h5>Orders for {{ slotProps.data.name }}</h5>
                    <DataTable :value="slotProps.data.orders">
                        <Column field="id" header="Id" sortable></Column>
                        <Column field="customer" header="Customer" sortable></Column>
                        <Column field="date" header="Date" sortable></Column>
                        <Column field="amount" header="Amount" sortable>
                            <template #body="slotProps">
                                {{ formatCurrency(slotProps.data.amount) }}
                            </template>
                        </Column>
                        <Column field="status" header="Status" sortable>
                            <template #body="slotProps">
                                <Tag :severity="getOrderSeverity(slotProps.data)" :value="slotProps.data.status.toLowerCase()" />
                            </template>
                        </Column>
                        <Column headerStyle="width:4rem">
                            <template #body>
                                <Button icon="pi pi-search" />
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </template>
        </DataTable>
    </div>

    <div class="card">
        <div class="font-semibold text-xl mb-4">Grouping</div>
        <DataTable :sortOrder="1" :value="customers3" groupRowsBy="representative.name" rowGroupMode="subheader" scrollHeight="400px" scrollable sortField="representative.name" sortMode="single" tableStyle="min-width: 50rem">
            <template #groupheader="slotProps">
                <div class="flex items-center gap-2">
                    <img :alt="slotProps.data.representative.name" :src="`https://primefaces.org/cdn/primevue/images/avatar/${slotProps.data.representative.image}`" style="vertical-align: middle" width="32" />
                    <span>{{ slotProps.data.representative.name }}</span>
                </div>
            </template>
            <Column field="representative.name" header="Representative"></Column>
            <Column field="name" header="Name" style="min-width: 200px"></Column>
            <Column field="country" header="Country" style="min-width: 200px">
                <template #body="slotProps">
                    <div class="flex items-center gap-2">
                        <img :class="`flag flag-${slotProps.data.country.code}`" alt="flag" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" style="width: 24px" />
                        <span>{{ slotProps.data.country.name }}</span>
                    </div>
                </template>
            </Column>
            <Column field="company" header="Company" style="min-width: 200px"></Column>
            <Column field="status" header="Status" style="min-width: 200px">
                <template #body="slotProps">
                    <Tag :severity="getSeverity(slotProps.data.status)" :value="slotProps.data.status" />
                </template>
            </Column>
            <Column field="date" header="Date" style="min-width: 200px"></Column>
            <template #groupfooter="slotProps">
                <div class="flex justify-end font-bold w-full">
                    Total Customers:
                    {{ calculateCustomerTotal(slotProps.data.representative.name) }}
                </div>
            </template>
        </DataTable>
    </div>
</template>

<style lang="scss" scoped>
:deep(.p-datatable-frozen-tbody) {
    font-weight: bold;
}

:deep(.p-datatable-scrollable .p-frozen-column) {
    font-weight: bold;
}
</style>