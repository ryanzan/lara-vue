<template>
    <select multiple class="form-control input-sm " style="width:100%;">
        <slot></slot>
    </select>
</template>

<script>
    import jQuery from 'jquery';
    let $ = jQuery;
    export default {
        props: ['options', 'value', 'placeholder', 'url', 'selected'],
        data: function () {
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
                            results: $.map(data, function (value, index) {
                                return {
                                    text: value,
                                    id: index
                                }
                            }),
                            pagination: {
                                more: (params.page * 30) < data.total_count
                            }
                        };
                    },
                    cache: true
                },
            };
        },
        mounted: function () {
            var vm = this
            $(this.$el)
            // init select2
                .select2({
                    dropdownParent: $(this.$el).parent(),
                    allowClear: true,
                    minimumInputLength: 2,
                    ajax: this.ajaxOptions,
                    data:this.options

                })
                .val(this.value)
                .trigger('change')
                // emit event on change.
                .on('change', function () {
                    vm.$emit('input', $(this).val())
                })
        },
        methods:{
          prepareOptions(){
              let temp = this.options;
              return $.map(temp, function (value, index) {
                  return {
                      text: value,
                      id: index
                  }
              })
          }
        },
        watch: {
            value: function (value) {
                if ([...value].sort().join(",") !== [...$(this.$el).val()].sort().join(","))
                    $(this.$el).val(value).trigger('change');
            },
            options: function (options) {
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

