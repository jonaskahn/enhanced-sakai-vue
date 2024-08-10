<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const value = ref(0);
let interval = null;

function startProgress() {
    interval = setInterval(() => {
        let newValue = value.value + Math.floor(Math.random() * 10) + 1;
        if (newValue >= 100) {
            newValue = 100;
        }
        value.value = newValue;
    }, 2000);
}

function endProgress() {
    clearInterval(interval);
    interval = null;
}

onMounted(() => {
    startProgress();
});

onBeforeUnmount(() => {
    endProgress();
});
</script>

<template>
    <div class="card">
        <div class="font-semibold text-xl mb-4">ProgressBar</div>
        <div class="flex flex-col md:flex-row gap-4">
            <div class="md:w-1/2">
                <ProgressBar :value="value"></ProgressBar>
            </div>
            <div class="md:w-1/2">
                <ProgressBar :showValue="false" :value="50"></ProgressBar>
            </div>
        </div>
    </div>

    <div class="flex flex-col md:flex-row gap-8">
        <div class="md:w-1/2">
            <div class="card">
                <div class="font-semibold text-xl mb-4">Badge</div>
                <div class="flex gap-2">
                    <Badge :value="2"></Badge>
                    <Badge :value="8" severity="success"></Badge>
                    <Badge :value="4" severity="info"></Badge>
                    <Badge :value="12" severity="Warn"></Badge>
                    <Badge :value="3" severity="danger"></Badge>
                </div>

                <div class="font-semibold my-4">Overlay</div>
                <div class="flex gap-6">
                    <OverlayBadge value="2">
                        <i class="pi pi-bell" style="font-size: 2rem" />
                    </OverlayBadge>
                    <OverlayBadge severity="danger" value="4">
                        <i class="pi pi-calendar" style="font-size: 2rem" />
                    </OverlayBadge>
                    <OverlayBadge severity="danger">
                        <i class="pi pi-envelope" style="font-size: 2rem" />
                    </OverlayBadge>
                </div>

                <div class="font-semibold my-4">Button</div>
                <div class="flex gap-2">
                    <Button badge="8" class="mr-2" label="Emails"></Button>
                    <Button badge="8" badgeClass="p-badge-danger" icon="pi pi-users" label="Messages" severity="warn"></Button>
                </div>

                <div class="font-semibold my-4">Sizes</div>
                <div class="flex items-start gap-2">
                    <Badge :value="2"></Badge>
                    <Badge :value="4" severity="warn" size="large"></Badge>
                    <Badge :value="6" severity="success" size="xlarge"></Badge>
                </div>
            </div>

            <div class="card">
                <div class="font-semibold text-xl mb-4">Avatar</div>
                <div class="font-semibold mb-4">Group</div>
                <AvatarGroup>
                    <Avatar :image="'/demo/images/avatar/amyelsner.png'" shape="circle" size="large"></Avatar>
                    <Avatar :image="'/demo/images/avatar/asiyajavayant.png'" shape="circle" size="large"></Avatar>
                    <Avatar :image="'/demo/images/avatar/onyamalimba.png'" shape="circle" size="large"></Avatar>
                    <Avatar :image="'/demo/images/avatar/ionibowcher.png'" shape="circle" size="large"></Avatar>
                    <Avatar :image="'/demo/images/avatar/xuxuefeng.png'" shape="circle" size="large"></Avatar>
                    <Avatar :style="{ 'background-color': '#9c27b0', color: '#ffffff' }" label="+2" shape="circle" size="large"></Avatar>
                </AvatarGroup>

                <div class="font-semibold my-4">Label - Circle</div>
                <Avatar class="mr-2" label="P" shape="circle" size="xlarge"></Avatar>
                <Avatar :style="{ 'background-color': '#2196F3', color: '#ffffff' }" class="mr-2" label="V" shape="circle" size="large"></Avatar>
                <Avatar :style="{ 'background-color': '#9c27b0', color: '#ffffff' }" class="mr-2" label="U" shape="circle"></Avatar>

                <div class="font-semibold my-4">Icon - Badge</div>
                <OverlayBadge class="inline-flex" severity="danger" value="4">
                    <Avatar label="U" size="xlarge" />
                </OverlayBadge>
            </div>

            <div class="card">
                <div class="font-semibold text-xl mb-4">ScrollTop</div>
                <ScrollPanel :style="{ width: '250px', height: '200px' }">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae et leo duis ut diam. Ultricies mi quis hendrerit dolor magna eget est lorem. Amet consectetur
                        adipiscing elit ut. Nam libero justo laoreet sit amet. Pharetra massa massa ultricies mi quis hendrerit dolor magna. Est ultricies integer quis auctor elit sed vulputate. Consequat ac felis donec et. Tellus orci ac auctor
                        augue mauris. Semper feugiat nibh sed pulvinar proin gravida hendrerit lectus a. Tincidunt arcu non sodales neque sodales. Metus aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices. Sodales ut etiam sit amet
                        nisl purus. Cursus sit amet dictum sit amet. Tristique senectus et netus et malesuada fames ac turpis egestas. Et tortor consequat id porta nibh venenatis cras sed. Diam maecenas ultricies mi eget mauris. Eget egestas purus
                        viverra accumsan in nisl nisi. Suscipit adipiscing bibendum est ultricies integer. Mattis aliquam faucibus purus in massa tempor nec.
                    </p>
                    <ScrollTop :threshold="100" icon="pi pi-arrow-up" target="parent"></ScrollTop>
                </ScrollPanel>
            </div>
        </div>
        <div class="md:w-1/2">
            <div class="card">
                <div class="font-semibold text-xl mb-4">Tag</div>
                <div class="font-semibold mb-4">Default</div>
                <div class="flex gap-2">
                    <Tag value="Primary"></Tag>
                    <Tag severity="success" value="Success"></Tag>
                    <Tag severity="info" value="Info"></Tag>
                    <Tag severity="warn" value="Warn"></Tag>
                    <Tag severity="danger" value="Danger"></Tag>
                </div>

                <div class="font-semibold my-4">Pills</div>
                <div class="flex gap-2">
                    <Tag :rounded="true" value="Primary"></Tag>
                    <Tag :rounded="true" severity="success" value="Success"></Tag>
                    <Tag :rounded="true" severity="info" value="Info"></Tag>
                    <Tag :rounded="true" severity="warn" value="Warn"></Tag>
                    <Tag :rounded="true" severity="danger" value="Danger"></Tag>
                </div>

                <div class="font-semibold my-4">Icons</div>
                <div class="flex gap-2">
                    <Tag icon="pi pi-user" value="Primary"></Tag>
                    <Tag icon="pi pi-check" severity="success" value="Success"></Tag>
                    <Tag icon="pi pi-info-circle" severity="info" value="Info"></Tag>
                    <Tag con="pi pi-exclamation-triangle" severity="warn" value="Warn"></Tag>
                    <Tag icon="pi pi-times" severity="danger" value="Danger"></Tag>
                </div>
            </div>

            <div class="card">
                <div class="font-semibold text-xl mb-4">Chip</div>
                <div class="font-semibold mb-4">Basic</div>
                <div class="flex items-center flex-col sm:flex-row">
                    <Chip class="mr-2 mb-2" label="Action"></Chip>
                    <Chip class="mr-2 mb-2" label="Comedy"></Chip>
                    <Chip class="mr-2 mb-2" label="Mystery"></Chip>
                    <Chip :removable="true" class="mb-2" label="Thriller"></Chip>
                </div>

                <div class="font-semibold my-4">Icon</div>
                <div class="flex items-center flex-col sm:flex-row">
                    <Chip class="mr-2 mb-2" icon="pi pi-apple" label="Apple"></Chip>
                    <Chip class="mr-2 mb-2" icon="pi pi-facebook" label="Facebook"></Chip>
                    <Chip class="mr-2 mb-2" icon="pi pi-google" label="Google"></Chip>
                    <Chip :removable="true" class="mb-2" icon="pi pi-microsoft" label="Microsoft"></Chip>
                </div>

                <div class="font-semibold my-4">Image</div>
                <div class="flex items-center flex-col sm:flex-row">
                    <Chip :image="'/demo/images/avatar/amyelsner.png'" class="mr-2 mb-2" label="Amy Elsner"></Chip>
                    <Chip :image="'/demo/images/avatar/asiyajavayant.png'" class="mr-2 mb-2" label="Asiya Javayant"></Chip>
                    <Chip :image="'/demo/images/avatar/onyamalimba.png'" class="mr-2 mb-2" label="Onyama Limba"></Chip>
                </div>
            </div>

            <div class="card">
                <div class="font-semibold text-xl mb-4">Skeleton</div>
                <div class="rounded-border border border-surface p-6">
                    <div class="flex mb-4">
                        <Skeleton class="mr-2" shape="circle" size="4rem"></Skeleton>
                        <div>
                            <Skeleton class="mb-2" width="10rem"></Skeleton>
                            <Skeleton class="mb-2" width="5rem"></Skeleton>
                            <Skeleton height=".5rem"></Skeleton>
                        </div>
                    </div>
                    <Skeleton height="150px" width="100%"></Skeleton>
                    <div class="flex justify-between mt-4">
                        <Skeleton height="2rem" width="4rem"></Skeleton>
                        <Skeleton height="2rem" width="4rem"></Skeleton>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
