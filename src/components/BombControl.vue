<template>
    <div>
        <b-container class="bv-example-row">
            <b-row>
                <b-col>
                    <b-input-group style="display:block;">
                        <b-button class=" btn btn-success" @click="lessSlideControl()">
                            <b-icon icon="dash-lg"></b-icon>
                        </b-button>
                        <input type="text" class="text-center" v-model="lastSlide" style="height: 36px;" disabled>
                        <b-button class="btn btn-success" @click="plusSlideControl()">
                            <b-icon icon="plus-lg"></b-icon>
                        </b-button>
                    </b-input-group>
                </b-col>
                <div class="w-100"></div>
                <b-col>
                    <b-button class="p-2 my-3" :class="[lastStatus ? 'btn-danger' : 'btn-success']"
                        @click="toggleStatus()">
                        {{ lastStatus ? 'DESLIGAR' : 'LIGAR' }}
                    </b-button>
                </b-col>
            </b-row>
        </b-container>
    </div>

</template>

<script>
import FirebaseServices from '../services/FirebaseServices.js';

export default {
    data() {
        return {
            controlStatus: false,
            controlSlide: 0,
            lastSoilMoisture: 0,
        }
    },

    computed: {
        lastStatus() {
            return this.controlStatus;
        },

        lastSlide() {
            return this.controlSlide;
        },
    },
    methods: {
        getSelectedDataBombControl() {
            FirebaseServices.getStateBombControl().on('value', (Control) => {
                let statusControl = Control.val();
                this.controlStatus = statusControl;
            })
        },

        getSelectedDataSlideControl() {
            FirebaseServices.getValueSlideControl().on('value', (Slide) => {
                let slideControl = Slide.val();
                this.controlSlide = slideControl;
            })
        },

        toggleStatus() {
            FirebaseServices.getStateBombControl().set(!this.lastStatus);
        },

        plusSlideControl() {
            if (this.controlSlide >= 100) return;
            FirebaseServices.getValueSlideControl().set(this.controlSlide += 1);
        },

        lessSlideControl() {
            if (this.controlSlide <= this.lastSoilMoisture) {
                this.controlSlide = this.lastSoilMoisture;
                return;
            }

            FirebaseServices.getValueSlideControl().set(this.controlSlide -= 1);
        },

        updateLastSoilMoisture(lastSoilMoisture) {
            this.lastSoilMoisture = parseInt(lastSoilMoisture);
            this.controlSlide = parseInt(lastSoilMoisture);
            FirebaseServices.getValueSlideControl().set(parseInt(lastSoilMoisture));
        }
    },

    created() {
        this.getSelectedDataBombControl();
        // this.getSelectedDataSlideControl();
    },
}
</script>

