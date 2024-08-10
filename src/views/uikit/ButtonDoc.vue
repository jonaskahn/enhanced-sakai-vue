<script setup>
import { ref } from 'vue';

const items = ref([
    {
        label: 'Update',
        icon: 'pi pi-refresh'
    },
    {
        label: 'Delete',
        icon: 'pi pi-times'
    },
    {
        separator: true
    },
    {
        label: 'Home',
        icon: 'pi pi-home'
    }
]);

const loading = ref([false, false, false]);

function load(index) {
    loading.value[index] = true;
    setTimeout(() => (loading.value[index] = false), 1000);
}
</script>

<template>
    <div class="flex flex-col md:flex-row gap-8">
        <div class="md:w-1/2">
            <div class="card flex flex-col gap-4">
                <div class="font-semibold text-xl">Default</div>
                <div class="flex flex-wrap gap-2">
                    <Button label="Submit"></Button>
                    <Button :disabled="true" label="Disabled"></Button>
                    <Button class="p-button-link" label="Link" />
                </div>
            </div>
            <div class="card flex flex-col gap-4">
                <div class="font-semibold text-xl">Severities</div>
                <div class="flex flex-wrap gap-2">
                    <Button label="Primary" />
                    <Button label="Secondary" severity="secondary" />
                    <Button label="Success" severity="success" />
                    <Button label="Info" severity="info" />
                    <Button label="Warn" severity="warn" />
                    <Button label="Help" severity="help" />
                    <Button label="Danger" severity="danger" />
                    <Button label="Contrast" severity="contrast" />
                </div>
            </div>
            <div class="card flex flex-col gap-4">
                <div class="font-semibold text-xl">Text</div>
                <div class="flex flex-wrap gap-2">
                    <Button label="Primary" text />
                    <Button label="Secondary" severity="secondary" text />
                    <Button label="Success" severity="success" text />
                    <Button label="Info" severity="info" text />
                    <Button label="Warn" severity="warn" text />
                    <Button label="Help" severity="help" text />
                    <Button label="Danger" severity="danger" text />
                    <Button label="Plain" plain text />
                </div>
            </div>
            <div class="card flex flex-col gap-4">
                <div class="font-semibold text-xl">Outlined</div>
                <div class="flex flex-wrap gap-2">
                    <Button label="Primary" outlined />
                    <Button label="Secondary" outlined severity="secondary" />
                    <Button label="Success" outlined severity="success" />
                    <Button label="Info" outlined severity="info" />
                    <Button label="warn" outlined severity="warn" />
                    <Button label="Help" outlined severity="help" />
                    <Button label="Danger" outlined severity="danger" />
                    <Button label="Contrast" outlined severity="contrast" />
                </div>
            </div>
            <div class="card flex flex-col gap-4">
                <div class="font-semibold text-xl">Group</div>
                <div class="flex flex-wrap gap-2">
                    <ButtonGroup>
                        <Button icon="pi pi-check" label="Save" />
                        <Button icon="pi pi-trash" label="Delete" />
                        <Button icon="pi pi-times" label="Cancel" />
                    </ButtonGroup>
                </div>
            </div>
            <div class="card flex flex-col gap-4">
                <div class="font-semibold text-xl">SplitButton</div>
                <div class="flex flex-wrap gap-2">
                    <SplitButton :model="items" label="Save"></SplitButton>
                    <SplitButton :model="items" label="Save" severity="secondary"></SplitButton>
                    <SplitButton :model="items" label="Save" severity="success"></SplitButton>
                    <SplitButton :model="items" label="Save" severity="info"></SplitButton>
                    <SplitButton :model="items" label="Save" severity="warn"></SplitButton>
                    <SplitButton :model="items" label="Save" severity="help"></SplitButton>
                    <SplitButton :model="items" label="Save" severity="danger"></SplitButton>
                    <SplitButton :model="items" label="Save" severity="contrast"></SplitButton>
                </div>
            </div>
            <div class="card flex flex-col gap-4">
                <div class="font-semibold text-xl">Templating</div>
                <div class="flex flex-wrap gap-2">
                    <Button type="button">
                        <img alt="logo" src="/demo/images/logo-white.svg" style="width: 1.5rem" />
                    </Button>
                    <Button outlined severity="success" type="button">
                        <img alt="logo" src="/demo/images/logo.svg" style="width: 1.5rem" />
                        <span class="ml-2 text-bold">PrimeVue</span>
                    </Button>
                </div>
            </div>
        </div>
        <div class="md:w-1/2">
            <div class="card flex flex-col gap-4">
                <div class="font-semibold text-xl">Icons</div>
                <div class="flex flex-wrap gap-2">
                    <Button class="mr-2 mb-2" icon="pi pi-star-fill"></Button>
                    <Button class="mr-2 mb-2" icon="pi pi-bookmark" label="Bookmark"></Button>
                    <Button class="mr-2 mb-2" icon="pi pi-bookmark" iconPos="right" label="Bookmark"></Button>
                </div>
            </div>
            <div class="card flex flex-col gap-4">
                <div class="font-semibold text-xl">Raised</div>
                <div class="flex flex-wrap gap-2">
                    <Button label="Primary" raised />
                    <Button label="Secondary" raised severity="secondary" />
                    <Button label="Success" raised severity="success" />
                    <Button label="Info" raised severity="info" />
                    <Button label="Warn" raised severity="warn" />
                    <Button label="Help" raised severity="help" />
                    <Button label="Danger" raised severity="danger" />
                    <Button label="Contrast" raised severity="contrast" />
                </div>
            </div>
            <div class="card flex flex-col gap-4">
                <div class="font-semibold text-xl">Rounded</div>
                <div class="flex flex-wrap gap-2">
                    <Button label="Primary" rounded />
                    <Button label="Secondary" rounded severity="secondary" />
                    <Button label="Success" rounded severity="success" />
                    <Button label="Info" rounded severity="info" />
                    <Button label="Warn" rounded severity="warn" />
                    <Button label="Help" rounded severity="help" />
                    <Button label="Danger" rounded severity="danger" />
                    <Button label="Contrast" rounded severity="contrast" />
                </div>
            </div>
            <div class="card flex flex-col gap-4">
                <div class="font-semibold text-xl">Rounded Icons</div>
                <div class="flex flex-wrap gap-2">
                    <Button icon="pi pi-check" rounded />
                    <Button icon="pi pi-bookmark" rounded severity="secondary" />
                    <Button icon="pi pi-search" rounded severity="success" />
                    <Button icon="pi pi-user" rounded severity="info" />
                    <Button icon="pi pi-bell" rounded severity="warn" />
                    <Button icon="pi pi-heart" rounded severity="help" />
                    <Button icon="pi pi-times" rounded severity="danger" />
                </div>
            </div>
            <div class="card flex flex-col gap-4">
                <div class="font-semibold text-xl">Rounded Text</div>
                <div class="flex flex-wrap gap-2">
                    <Button icon="pi pi-check" raised rounded text />
                    <Button icon="pi pi-bookmark" raised rounded severity="secondary" text />
                    <Button icon="pi pi-search" raised rounded severity="success" text />
                    <Button icon="pi pi-user" raised rounded severity="info" text />
                    <Button icon="pi pi-bell" raised rounded severity="warn" text />
                    <Button icon="pi pi-heart" raised rounded severity="help" text />
                    <Button icon="pi pi-times" raised rounded severity="danger" text />
                </div>
            </div>
            <div class="card flex flex-col gap-4">
                <div class="font-semibold text-xl">Rounded Outlined</div>
                <div class="flex flex-wrap gap-2">
                    <Button icon="pi pi-check" outlined rounded />
                    <Button icon="pi pi-bookmark" outlined rounded severity="secondary" />
                    <Button icon="pi pi-search" outlined rounded severity="success" />
                    <Button icon="pi pi-user" outlined rounded severity="info" />
                    <Button icon="pi pi-bell" outlined rounded severity="warn" />
                    <Button icon="pi pi-heart" outlined rounded severity="help" />
                    <Button icon="pi pi-times" outlined rounded severity="danger" />
                </div>
            </div>
            <div class="card flex flex-col gap-4">
                <div class="font-semibold text-xl">Loading</div>
                <div class="flex flex-wrap gap-2">
                    <Button :loading="loading[0]" class="mr-2 mb-2" icon="pi pi-search" label="Search" type="button" @click="load(0)" />
                    <Button :loading="loading[1]" class="mr-2 mb-2" icon="pi pi-search" iconPos="right" label="Search" type="button" @click="load(1)" />
                    <Button :loading="loading[2]" class="mr-2 mb-2" icon="pi pi-search" type="button" @click="load(2)" />
                    <Button :loading="loading[3]" class="mr-2 mb-2" label="Search" type="button" @click="load(3)" />
                </div>
            </div>
        </div>
    </div>
</template>
