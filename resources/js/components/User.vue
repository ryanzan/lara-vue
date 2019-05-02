<template>
    <div class="box">
        <div class="box-header with-border">
            <h3 class="box-title">User List</h3>
        </div>
        <div class="box-body">
            <div class="row">
                <div class="col-sm-2 pull-right">
                    <button @click.prevent="createUser" class="btn btn-block btn-primary">Create</button>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-12">
                    <table class="table table-bordered table-striped " role="grid">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Operations</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-if="users && users.length" v-for="(user, index) in users" :key="user.id">
                            <td>{{index+1}}</td>
                            <td>{{user.name}}</td>
                            <td>{{user.email}}</td>
                            <td>
                                <a role="button" href="#" class="btn btn-xs btn-primary" @click.prevent="editUser(user)"><i class="fa fa-edit"></i> Edit</a>
                                <a role="button" href="#" class="btn btn-xs btn-danger btnDelete"
                                   @click.prevent="deleteUser(user.id)"><i class="fa fa-trash"></i> Delete</a>

                            </td>
                        </tr>
                        <p v-else>No data.</p>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div id="myModal" class="modal fade" role="dialog">
            <div class="modal-dialog">

                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 v-show="!editing" class="modal-title">Add User</h4>
                        <h4 v-show="editing" class="modal-title">Update User</h4>

                    </div>
                    <form @submit.prevent="editing ? updateUser() : saveUser()">
                        <div class="modal-body">

                            <div class="form-group" :class="{ 'has-error': form.errors.has('name') }">
                                <label>Name</label>
                                <input v-model="form.name" type="text" name="name" class="form-control">
                                <has-error :form="form" field="name"></has-error>
                            </div>
                            <div class="form-group" :class="{ 'has-error': form.errors.has('email') }">
                                <label>Email</label>
                                <input v-model="form.email" type="text" name="email" class="form-control">
                                <has-error :form="form" field="email"></has-error>
                            </div>
                            <div class="form-group" :class="{ 'has-error': form.errors.has('password') }">
                                <label>Password</label>
                                <input v-model="form.password" type="password" name="password" class="form-control">
                                <has-error :form="form" field="password"></has-error>
                            </div>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
                            <button v-show="!editing" type="submit" class="btn btn-success">Create</button>
                            <button v-show="editing" type="submit" class="btn btn-success">Update</button>

                        </div>
                    </form>
                </div>

            </div>
        </div>
    </div>

</template>

<script>
    export default {
        data() {
            return {

                form: new Form({
                    id:'',
                    name: '',
                    email: '',
                    password: ''
                }),
                users: {},
                creating: false,
                editing : false
            }
        },
        mounted() {
            this.fetchUsers();
        },
        methods: {
            fetchUsers() {
                this.$Progress.start();
                axios.get('api/users').then(({data}) => (this.users = data.data));
                this.$Progress.finish()
            },
            createUser(){
                if (!this.creating)
                    this.form.reset();
                this.editing = false,
                this.creating = true;
                $('#myModal').modal('show');
            },
            saveUser() {
                this.creating = true;
                this.$Progress.start();
                this.form.post('api/users').then(() => {
                    this.creating = false;
                    $('#myModal').modal('hide');
                    this.fetchUsers();
                    Toast.fire({
                        type: 'success',
                        title: 'User Created successfully'
                    })
                }).catch(() => {

                });
                this.$Progress.finish()
            },
            editUser(user){
                this.editing = true;
                this.creating = false;
                this.form.reset();
                this.form.errors.clear();
                $('#myModal').modal('show');
                this.form.fill(user);
            },
            updateUser(){
                this.$Progress.start();
                this.form.put('api/users/'+this.form.id).then(() => {
                    $('#myModal').modal('hide');
                    this.fetchUsers();
                    Toast.fire({
                        type: 'success',
                        title: 'User Updated successfully'
                    })
                }).catch(() => {
                    this.$Progress.fail();
                });
                this.$Progress.finish()
            },
            deleteUser(id) {
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    this.$Progress.start();
                    if (result.value) {
                        this.form.delete('api/users/' + id).then(() => {
                            Swal.fire(
                                'Deleted!',
                                'User has been deleted.',
                                'success'
                            )
                            this.fetchUsers();
                        }).catch(() => {
                            Swal.fire(
                                'Oops!',
                                'Something went wrong.',
                                'warning'
                            )
                        });
                        this.$Progress.finish()
                    }
                    this.$Progress.finish()
                });

            }
        }
    }
</script>
