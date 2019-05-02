<template>
    <select class="form-control input-sm " style="width:100%;" >
        <slot></slot>
    </select>
</template>
<script>
    export default {
        props: ['options', 'value','placeholder','url'],
        data: function() {
            return {
                ajaxOptions: {
                    url: this.url,
                    dataType: 'json',
                    delay: 250,
                    tags: true,
                    data: function (params) {
                        return {
                            term: params.term, // search term
                            page: params.page
                        };
                    },
                    processResults: function (data, params) {
                        params.page = params.page || 1;
                        return {
                            results: $.map(data, function (value,index) {
                                return {
                                    text: value,
                                    id: index
                                }}),
                            pagination: {
                                more: (params.page * 30) < data.total_count
                            }
                        };
                    },
                    cache: true
                }
            };
        },
        mounted: function () {
            var vm = this
            $(this.$el)
            // init select2
                .select2({
                    dropdownParent: $(this.$el).parent(),
                    minimumInputLength: 2,
                    allowClear: true,
                    placeholder: this.placeholder,
                    ajax: this.ajaxOptions
                })
                .val(this.value)
                .trigger('change')
                // emit event on change.
                .on('change', function () {
                    vm.$emit('input', this.value)
                })
        },
        watch: {
            value: function (value) {
                // update value
                $(this.$el)
                    .val(value)
                    .trigger('change')
                // var select = $(this.$el).select2();
                // select.val(value).trigger("change");
            },
            options: function (options) {
                // update options
                $(this.$el).empty().select2({ data: options })
            },
            url: function(value) {
                this.ajaxOptions.url = this.url;
                $(this.$el).select2({ajax: this.ajaxOptions});
            }
        },
        destroyed: function () {
            $(this.$el).off().select2('destroy')
        }

    };


</script>

