<template>
    <div class="box">
        <div class="box-header with-border">
            <h3 class="box-title">Profile</h3>
        </div>
        <div class="box-body">
            <div class="row">
                <div class="col-md-3">

                    <!-- Profile Image -->
                    <div class="box box-primary">
                        <div class="box-body box-profile">
                            <img class="profile-user-img img-responsive img-circle" :src="getProfileImage()"
                                 alt="User profile picture">

                            <h3 class="profile-username text-center">Nina Mcintire</h3>

                            <p class="text-muted text-center">Software Engineer</p>

                            <ul class="list-group list-group-unbordered">
                                <li class="list-group-item">
                                    <b>Followers</b> <a class="pull-right">1,322</a>
                                </li>
                                <li class="list-group-item">
                                    <b>Following</b> <a class="pull-right">543</a>
                                </li>
                                <li class="list-group-item">
                                    <b>Friends</b> <a class="pull-right">13,287</a>
                                </li>
                            </ul>

                            <a href="#" class="btn btn-primary btn-block"><b>Follow</b></a>
                        </div>
                        <!-- /.box-body -->
                    </div>
                    <!-- /.box -->

                    <!-- About Me Box -->
                    <div class="box box-primary">
                        <div class="box-header with-border">
                            <h3 class="box-title">About Me</h3>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body">
                            <strong><i class="fa fa-book margin-r-5"></i> Education</strong>

                            <p class="text-muted">
                                B.S. in Computer Science from the University of Tennessee at Knoxville
                            </p>

                            <hr>

                            <strong><i class="fa fa-map-marker margin-r-5"></i> Location</strong>

                            <p class="text-muted">Malibu, California</p>

                            <hr>

                            <strong><i class="fa fa-pencil margin-r-5"></i> Skills</strong>

                            <p>
                                <span class="label label-danger">UI Design</span>
                                <span class="label label-success">Coding</span>
                                <span class="label label-info">Javascript</span>
                                <span class="label label-warning">PHP</span>
                                <span class="label label-primary">Node.js</span>
                            </p>

                            <hr>

                            <strong><i class="fa fa-file-text-o margin-r-5"></i> Notes</strong>

                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam fermentum enim neque.</p>
                        </div>
                        <!-- /.box-body -->
                    </div>
                    <!-- /.box -->
                </div>
                <!-- /.col -->
                <div class="col-md-9">
                    <form class="form-horizontal" @submit.prevent="updateProfile">
                        <div class="form-group" :class="{ 'has-error': form.errors.has('name') }">
                            <label class="col-sm-2 control-label">Name</label>
                            <div class="col-sm-10">
                                <input v-model="form.name" type="text" name="name" class="form-control">
                                <has-error :form="form" field="name"></has-error>
                            </div>
                        </div>
                        <div class="form-group" :class="{ 'has-error': form.errors.has('email') }">
                            <label class="col-sm-2 control-label">Email</label>
                            <div class="col-sm-10">
                                <input v-model="form.email" type="text" name="email" class="form-control">
                                <has-error :form="form" field="email"></has-error>
                            </div>
                        </div>
                        <div class="form-group" :class="{ 'has-error': form.errors.has('address') }">
                            <label class="col-sm-2 control-label">Address</label>
                            <div class="col-sm-10">
                                <input v-model="form.address" type="text" name="address" class="form-control">
                                <has-error :form="form" field="address"></has-error>
                            </div>
                        </div>
                        <div class="form-group" :class="{ 'has-error': form.errors.has('phone') }">
                            <label class="col-sm-2 control-label">Phone</label>
                            <div class="col-sm-10">
                                <input v-model="form.phone" type="text" name="phone" class="form-control">
                                <has-error :form="form" field="phone"></has-error>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="inputName" class="col-sm-2 control-label">Profile Image</label>

                            <div class="col-sm-10">
                                <input type="file" @change="updateImage" id="" placeholder="Name">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-offset-2 col-sm-10">
                                <button type="submit" class="btn btn-danger">Update</button>
                            </div>
                        </div>
                    </form>
                </div>
                <!-- /.col -->
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        data() {
            return {

                form: new Form({
                    id: '',
                    name: '',
                    email: '',
                    address: '',
                    phone: '',
                    image: ''
                }),
                user: {},
                creating: false,
                editing: false
            }
        },
        mounted() {

        },
        created() {
          this.getProfile();
        },
        methods: {
            getProfile(){
                this.$Progress.start();
                axios.get('api/profile').then(({data}) => (
                    this.form.fill(data)
                ));
                this.$Progress.finish();
            },
            getProfileImage(){
              return  this.form.image.indexOf('base64') != -1 ? this.form.image : "img/profile/"+this.form.image;
            },
            updateProfile() {
                this.$Progress.start();
                this.form.put('api/profile').then(() => {
                    Swal.fire(
                        'Updated!',
                        'Your Profile has been updated.',
                        'success'
                    )
                    this.getProfile();
                }).catch(() => {
                    Swal.fire(
                        'Oops!',
                        'Something went wrong.',
                        'warning'
                    )
                });
                this.$Progress.finish()
            },
            updateImage(e) {
                let file = e.target.files[0];
                let reader = new FileReader();
                reader.onloadend = (file) => {
                    this.form.image = reader.result;
                }
                reader.readAsDataURL(file);
            }
        }
    }
</script>
