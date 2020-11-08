<template>
    <div class="text-center py-5 px-2 h-100">
        <h1 class="font-heading h2">Integrations</h1>
        <div class="overflow-auto container mt-5 h-100">
          <div class="row px-2">
            <div class="col-md-6 col-lg-4 px-3 mb-4 pb-1">
                <div class="card shadow-sm rounded position-relative">
                    <checkmark-icon width="36" height="36" v-if="$root.auth.zoom_token" class="integrated-icon fill-green position-absolute"></checkmark-icon>
                    <div class="card-body">
                        <img src="/logos/zoom.png" alt="Zoom" height="80">
                        <p class="my-3 text-ellipsis">Create scheduled meeting for your bookings</p>
                        <vue-button v-if="$root.auth.zoom_token" :loading="zoomLoading" button_class="btn btn-light shadow-none" type="button" @click="removeZoom">Remove</vue-button>
                        <vue-button v-else button_class="btn btn-primary" :loading="zoomLoading" type="button" @click="integrateZoom">Integrate</vue-button>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-lg-4 px-3 mb-4 pb-1">
                <div class="card shadow-sm rounded">
                    <checkmark-icon width="36" height="36" v-if="$root.auth.google_calendar_token" class="integrated-icon fill-green position-absolute"></checkmark-icon>
                    <div class="card-body">
                        <img src="/logos/google-calendar.png" alt="Google Calendar" height="80">
                        <p class="my-3 text-ellipsis">Sync bookings with your Google Calendar</p>
                        <vue-button v-if="$root.auth.google_calendar_token" :loading="googleCalendarLoading" button_class="btn btn-light shadow-none" type="button" @click="removeGoogleCalendar">Remove</vue-button>
                        <vue-button v-else button_class="btn btn-primary" :loading="googleCalendarLoading" type="button" @click="integrateGoogleCalendar">Integrate</vue-button>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-lg-4 px-3 mb-4 pb-1">
                <div class="card shadow-sm rounded">
                    <checkmark-icon width="36" height="36" v-if="$root.auth.outlook_token" class="integrated-icon fill-green position-absolute"></checkmark-icon>
                    <div class="card-body">
                        <img src="/logos/outlook.png" alt="Outlook Calendar" height="80">
                        <p class="my-3 text-ellipsis">Sync bookings with your Outlook Calendar</p>
                        <vue-button v-if="$root.auth.outlook_token" :loading="outlookLoading" button_class="btn btn-light shadow-none" type="button" @click="removeOutlook">Remove</vue-button>
                        <vue-button v-else button_class="btn btn-primary" :loading="outlookLoading" type="button" @click="integrateOutlook">Integrate</vue-button>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-lg-4 px-3">
                <div class="card shadow-sm rounded">
                    <checkmark-icon width="36" height="36" v-if="$root.auth.xero_token" class="integrated-icon fill-green position-absolute"></checkmark-icon>
                    <div class="card-body">
                        <img src="/logos/xero.png" alt="Outlook Calendar" height="80">
                        <p class="my-3 text-ellipsis">Manage your Xero invoices</p>
                        <vue-button v-if="$root.auth.xero_token" :loading="xeroLoading" button_class="btn btn-light shadow-none" type="button" @click="removeXero">Remove</vue-button>
                        <vue-button v-else button_class="btn btn-primary" :loading="xeroLoading" type="button" @click="integrateXero">Integrate</vue-button>
                    </div>
                </div>
            </div>
          </div>
        </div>
    </div>
</template>

<script src="./integrations.js"></script>

<style lang="scss" scoped src="./integrations.scss"></style>