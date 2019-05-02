<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card card-default">
                    <div class="card-header">Dashboard Component</div>

                    <div class="card-body">
                        <select2 v-model="selected" :placeholder="'--select patient--'"
                                :options="options" :url="'api/search'" >
                        </select2>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        mounted() {
            console.log('Component mounted.')
        },
        data(){
            return {
                options :{'id':1,'value':'afaff'},
                selected: ''
            };
        }
    }
</script>
