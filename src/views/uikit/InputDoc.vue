<script setup>
import { CountryService } from '@/service/CountryService';
import { NodeService } from '@/service/NodeService';
import { onMounted, ref } from 'vue';

const floatValue = ref(null);
const autoValue = ref(null);
const selectedAutoValue = ref(null);
const autoFilteredValue = ref([]);
const calendarValue = ref(null);
const inputNumberValue = ref(null);
const sliderValue = ref(50);
const ratingValue = ref(null);
const colorValue = ref('#1976D2');
const radioValue = ref(null);
const checkboxValue = ref([]);
const switchValue = ref(false);
const listboxValues = ref([
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
]);
const listboxValue = ref(null);
const dropdownValues = ref([
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
]);
const dropdownValue = ref(null);
const multiselectValues = ref([
    { name: 'Australia', code: 'AU' },
    { name: 'Brazil', code: 'BR' },
    { name: 'China', code: 'CN' },
    { name: 'Egypt', code: 'EG' },
    { name: 'France', code: 'FR' },
    { name: 'Germany', code: 'DE' },
    { name: 'India', code: 'IN' },
    { name: 'Japan', code: 'JP' },
    { name: 'Spain', code: 'ES' },
    { name: 'United States', code: 'US' }
]);

const multiselectValue = ref(null);
const toggleValue = ref(false);
const selectButtonValue = ref(null);
const selectButtonValues = ref([{ name: 'Option 1' }, { name: 'Option 2' }, { name: 'Option 3' }]);
const knobValue = ref(50);
const inputGroupValue = ref(false);
const treeSelectNodes = ref(null);
const selectedNode = ref(null);

onMounted(() => {
    CountryService.getCountries().then((data) => (autoValue.value = data));
    NodeService.getTreeNodes().then((data) => (treeSelectNodes.value = data));
});

function searchCountry(event) {
    setTimeout(() => {
        if (!event.query.trim().length) {
            autoFilteredValue.value = [...autoValue.value];
        } else {
            autoFilteredValue.value = autoValue.value.filter((country) => {
                return country.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 250);
}
</script>

<template>
    <Fluid class="flex flex-col md:flex-row gap-8">
        <div class="md:w-1/2">
            <div class="card flex flex-col gap-4">
                <div class="font-semibold text-xl">InputText</div>
                <div class="flex flex-col md:flex-row gap-4">
                    <InputText placeholder="Default" type="text" />
                    <InputText :disabled="true" placeholder="Disabled" type="text" />
                    <InputText invalid placeholder="Invalid" type="text" />
                </div>

                <div class="font-semibold text-xl">Icons</div>
                <IconField>
                    <InputIcon class="pi pi-user" />
                    <InputText placeholder="Username" type="text" />
                </IconField>
                <IconField iconPosition="left">
                    <InputText placeholder="Search" type="text" />
                    <InputIcon class="pi pi-search" />
                </IconField>

                <div class="font-semibold text-xl">Float Label</div>
                <FloatLabel>
                    <InputText id="username" v-model="floatValue" type="text" />
                    <label for="username">Username</label>
                </FloatLabel>

                <div class="font-semibold text-xl">Textarea</div>
                <Textarea :autoResize="true" cols="30" placeholder="Your Message" rows="3" />

                <div class="font-semibold text-xl">AutoComplete</div>
                <AutoComplete v-model="selectedAutoValue" :suggestions="autoFilteredValue" display="chip" dropdown multiple optionLabel="name" placeholder="Search" @complete="searchCountry($event)" />

                <div class="font-semibold text-xl">DatePicker</div>
                <DatePicker v-model="calendarValue" :showButtonBar="true" :showIcon="true"></DatePicker>

                <div class="font-semibold text-xl">InputNumber</div>
                <InputNumber v-model="inputNumberValue" mode="decimal" showButtons></InputNumber>
            </div>

            <div class="card flex flex-col gap-4">
                <div class="font-semibold text-xl">Slider</div>
                <InputText v-model.number="sliderValue" />
                <Slider v-model="sliderValue" />

                <div class="flex flex-row mt-6">
                    <div class="flex flex-col gap-4 w-1/2">
                        <div class="font-semibold text-xl">Rating</div>
                        <Rating v-model="ratingValue" />
                    </div>
                    <div class="flex flex-col gap-4 w-1/2">
                        <div class="font-semibold text-xl">ColorPicker</div>
                        <ColorPicker v-model="colorValue" style="width: 2rem" />
                    </div>
                </div>

                <div class="font-semibold text-xl">Knob</div>
                <Knob v-model="knobValue" :max="50" :min="-50" :step="10" valueTemplate="{value}%" />
            </div>
        </div>
        <div class="md:w-1/2">
            <div class="card flex flex-col gap-4">
                <div class="font-semibold text-xl">RadioButton</div>
                <div class="flex flex-col md:flex-row gap-4">
                    <div class="flex items-center">
                        <RadioButton id="option1" v-model="radioValue" name="option" value="Chicago" />
                        <label class="leading-none ml-2" for="option1">Chicago</label>
                    </div>
                    <div class="flex items-center">
                        <RadioButton id="option2" v-model="radioValue" name="option" value="Los Angeles" />
                        <label class="leading-none ml-2" for="option2">Los Angeles</label>
                    </div>
                    <div class="flex items-center">
                        <RadioButton id="option3" v-model="radioValue" name="option" value="New York" />
                        <label class="leading-none ml-2" for="option3">New York</label>
                    </div>
                </div>

                <div class="font-semibold text-xl">Checkbox</div>
                <div class="flex flex-col md:flex-row gap-4">
                    <div class="flex items-center">
                        <Checkbox id="checkOption1" v-model="checkboxValue" name="option" value="Chicago" />
                        <label class="ml-2" for="checkOption1">Chicago</label>
                    </div>
                    <div class="flex items-center">
                        <Checkbox id="checkOption2" v-model="checkboxValue" name="option" value="Los Angeles" />
                        <label class="ml-2" for="checkOption2">Los Angeles</label>
                    </div>
                    <div class="flex items-center">
                        <Checkbox id="checkOption3" v-model="checkboxValue" name="option" value="New York" />
                        <label class="ml-2" for="checkOption3">New York</label>
                    </div>
                </div>

                <div class="font-semibold text-xl">ToggleSwitch</div>
                <ToggleSwitch v-model="switchValue" />
            </div>

            <div class="card flex flex-col gap-4">
                <div class="font-semibold text-xl">Listbox</div>
                <Listbox v-model="listboxValue" :filter="true" :options="listboxValues" optionLabel="name" />

                <div class="font-semibold text-xl">Select</div>
                <Select v-model="dropdownValue" :options="dropdownValues" optionLabel="name" placeholder="Select" />

                <div class="font-semibold text-xl">MultiSelect</div>
                <MultiSelect v-model="multiselectValue" :filter="true" :options="multiselectValues" optionLabel="name" placeholder="Select Countries">
                    <template #value="slotProps">
                        <div v-for="option of slotProps.value" :key="option.code" class="inline-flex items-center py-1 px-2 bg-primary text-primary-contrast rounded-border mr-2">
                            <span :class="'mr-2 flag flag-' + option.code.toLowerCase()" style="width: 18px; height: 12px" />
                            <div>{{ option.name }}</div>
                        </div>
                        <template v-if="!slotProps.value || slotProps.value.length === 0">
                            <div class="p-1">Select Countries</div>
                        </template>
                    </template>
                    <template #option="slotProps">
                        <div class="flex items-center">
                            <span :class="'mr-2 flag flag-' + slotProps.option.code.toLowerCase()" style="width: 18px; height: 12px" />
                            <div>{{ slotProps.option.name }}</div>
                        </div>
                    </template>
                </MultiSelect>

                <div class="font-semibold text-xl">TreeSelect</div>
                <TreeSelect v-model="selectedNode" :options="treeSelectNodes" placeholder="Select Item"></TreeSelect>
            </div>

            <div class="card flex flex-col gap-4">
                <div class="font-semibold text-xl">ToggleButton</div>
                <ToggleButton v-model="toggleValue" :style="{ width: '10em' }" offLabel="No" onLabel="Yes" />

                <div class="font-semibold text-xl">SelectButton</div>
                <SelectButton v-model="selectButtonValue" :options="selectButtonValues" optionLabel="name" />
            </div>
        </div>
    </Fluid>

    <Fluid class="flex mt-8">
        <div class="card flex flex-col gap-4 w-full">
            <div class="font-semibold text-xl">InputGroup</div>
            <div class="flex flex-col md:flex-row gap-4">
                <InputGroup>
                    <InputGroupAddon>
                        <i class="pi pi-user"></i>
                    </InputGroupAddon>
                    <InputText placeholder="Username" />
                </InputGroup>
                <InputGroup>
                    <InputGroupAddon>
                        <i class="pi pi-clock"></i>
                    </InputGroupAddon>
                    <InputGroupAddon>
                        <i class="pi pi-star-fill"></i>
                    </InputGroupAddon>
                    <InputNumber placeholder="Price" />
                    <InputGroupAddon>$</InputGroupAddon>
                    <InputGroupAddon>.00</InputGroupAddon>
                </InputGroup>
            </div>
            <div class="flex flex-col md:flex-row gap-4">
                <InputGroup>
                    <Button label="Search" />
                    <InputText placeholder="Keyword" />
                </InputGroup>
                <InputGroup>
                    <InputGroupAddon>
                        <Checkbox v-model="inputGroupValue" :binary="true" />
                    </InputGroupAddon>
                    <InputText placeholder="Confirm" />
                </InputGroup>
            </div>
        </div>
    </Fluid>
</template>
