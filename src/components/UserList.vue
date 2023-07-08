<template>
  <div class="user-table-container">
    <h1>Users</h1>
    <div>
      <div
        class="spinner-border"
        role="status"
        :style="loader == true ? 'display: block' : 'display: none'"
      >
        <span class="sr-only">Loading...</span>
      </div>
      <button
        type="button"
        class="btn btn-primary float-right m-2"
        data-toggle="modal"
        data-target="#addUser"
      >
        Add User
      </button>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Profile Photo</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email Id</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr :key="user.id" v-for="user in getUsers">
            <td scope="row" class="profile-avtar">
              <img :src="user.avatar" />
            </td>
            <td>{{ user.first_name }}</td>
            <td>{{ user.last_name }}</td>
            <td>{{ user.email }}</td>
            <td style="cursor: pointer">
              <u @click="editUser(user.id)">Edit</u>
            </td>
            <td style="cursor: pointer">
              <u @click="deleteUser(user.id)">Delete</u>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      class="modal fade"
      id="addUser"
      tabindex="-1"
      role="dialog"
      aria-labelledby="addUser"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <form>
            <div class="modal-header">
              <h5 class="modal-title" id="addUser">Add User Details</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label for="emailid">Email address</label>
                <input
                  required
                  type="email"
                  v-model="userData.email"
                  class="form-control"
                  id="emailid"
                  aria-describedby="emailHelp"
                />
              </div>

              <div class="form-group">
                <label for="username">User Name</label>
                <input
                  required
                  v-model="userData.username"
                  type="text"
                  class="form-control"
                  id="username"
                  aria-describedby="emailHelp"
                />
              </div>

              <div class="form-group">
                <label for="password">Password</label>
                <input
                  required
                  type="password"
                  v-model="userData.password"
                  class="form-control"
                  id="password"
                />
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                @click="createUser"
                data-dismiss="modal"
              >
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "UserList",
  data() {
    return {
      loader: true,
      userData: {
        username: "",
        email: "",
        password: "",
      },
    };
  },
  mounted() {
    this.getUserList();
  },
  computed: {
    getUsers() {
      return this.$store.getters.getAllUser;
    },
  },
  methods: {
    editUser(id) {
      this.userData = this.getUsers.find((x) => x.id == id);
      this.$store.dispatch("editUser", id).then(() => {
        this.getUserList();
      });
    },
    deleteUser(id) {
      this.loader = true;
      this.$store.dispatch("deleteUser", id).then(() => {
        this.getUserList();
      });
    },
    getUserList() {
      this.loader = true;
      this.$store
        .dispatch("getAllUser", { page: 0, per_page: 10 })
        .then(() => {})
        .finally(() => {
          this.loader = false;
        });
    },
    createUser() {
      console.log("asaas");
      this.$store
        .dispatch("createUser", this.userData)
        .then(() => {
          this.getUserList();
        })
        .finally(() => {
          this.resetUser();
        });
    },
    resetUser() {
      this.userData.email = "";
      this.userData.password = "";
      this.userData.password = "";
    },
  },
};
</script>
<style scoped>
.user-table-container {
  width: 80%;
  margin-left: 200px;
}
.form-group label {
  float: left;
}

.profile-avtar img {
  height: 100px;
  width: 100px;
  border-radius: 50%;
}
.table {
  overflow: scroll;
}
</style>
