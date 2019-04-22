<template>
  <div class="f1 df fdr jcsb wrapper">
    <div class="page1 profile f1">
      <h4 class="mt0">Contact Info</h4>
      <div class="basic-profile">
        <div class="form-row df fdr">
          <span class="input-wrapper df fdc">
            <p>Full Name</p>
            <input v-on:input="changesMade()" v-model="fullName" class="input1" type="text">
          </span>
          <span class="input-wrapper df fdc">
            <p>Company</p>
            <input disabled v-on:input="changesMade()" v-model="company" class="input1" type="text">
          </span>
        </div>
        <div class="form-row df fdr">
          <span class="input-wrapper df fdc">
            <p>Phone No.</p>
            <input v-on:input="changesMade()" v-model="phone" class="input1" type="number">
          </span>
          <span class="input-wrapper df fdc">
            <p>Email</p>
            <input disabled v-on:input="changesMade()" v-model="email" class="input1" type="text">
          </span>
        </div>
        <div class="form-row df fdr">
          <span class="input-wrapper df fdc">
            <p>Address</p>
            <input v-on:input="changesMade()" v-model="address" class="input1" type="text">
          </span>
          <span class="input-wrapper df fdc">
            <p>City</p>
            <input v-on:input="changesMade()" v-model="city" class="input1" type="text">
          </span>
        </div>
        <div class="form-row df fdr">
          <span class="input-wrapper df fdc">
            <p>Country</p>
            <input v-on:input="changesMade()" v-model="country" class="input1" type="text">
          </span>
          <span class="input-wrapper input-wrapper-inner df fdr">
            <span class="input-wrapper df fdc">
              <p>Province</p>
              <input v-on:input="changesMade()" v-model="province" size="10" class="input1" type="text">
            </span>
            <span class="input-wrapper df fdc">
              <p>Postal Code</p>
              <input v-on:input="changesMade()" v-model="postalCode" size="10" class="input1" type="text">
            </span>
          </span>
        </div>
        <div class="form-row df fdr">
          <span class="input-wrapper df fdc">
            <button v-on:click="saveProfile()" class="button-form" v-bind:class="{'button-form-active': profileChangesMade}">
              Save Changes
            </button>
          </span>
          <span class="input-wrapper df fdc">
          </span>
        </div>
      </div>
      <h4>Profile Photo</h4>
      <div class="profile-photo">
        <div class="profile-photo-inner df fdr">
          <div class="profile-photo-image">
            <img class="profile-image" v-bind:src="$store.getters.userData.profileImage ? $store.getters.userData.profileImage : '../../static/images/profile_image_placeholder.jpeg'" alt="">
          </div>
          <div class="profile-photo-details df fdc jcsb">
            <h4 class="no-margin">Profile Photo</h4>
            <p>Upload your photo in png or jpg format.<br/>Dimensions: 160 w x 160 h</p>
            <div class="photo-buttons df fdr">
              <button v-on:click="deletePhoto()" class="button-form" v-bind:class="{'button-form-active': $store.getters.userData.profileImage}">
                Delete Photo
              </button>
              <input v-on:change="uploadPhotoContinue()" ref="fileInput" id="fileUploadButton" style="opacity: 0; width: 0; height: 0; position: absolute;" type="file" />
              <button v-on:click="uploadPhotoStart()" class="button-form button-form-active">
                Upload Photo
              </button>
            </div>
          </div>
        </div>
      </div>
      <h4>Change Password</h4>
      <div class="change-password">
        <div class="form-row df fdr">
          <span class="input-wrapper df fdc">
            <p>Enter Current Password</p>
            <input v-model="currentPassword" class="input1" type="password">
          </span>
          <span class="input-wrapper df fdc">
          </span>
        </div>
        <hr/>
        <div class="form-row df fdr">
          <span class="input-wrapper df fdc">
            <p>Enter New Password</p>
            <input v-model="newPassword" class="input1" type="password">
          </span>
          <span class="input-wrapper df fdc">
            <p>Confirm New Password</p>
            <input v-model="newPasswordRepeat" class="input1" type="password">
          </span>
        </div>
        <div class="form-row df fdr">
          <span class="input-wrapper df fdc">
            <button v-on:click="updatePassword()" class="button-form button-form-active">
              Change Password
            </button>
          </span>
          <span class="input-wrapper df fdc">
          </span>
        </div>
      </div>
      <h4>Delete Account</h4>
      <div class="delete-account">
        <div class="form-row df fdr">
          <p class="delete-account-text">
            If you’d like to delete your HourPrice account, click the button below. All account and profile data will be deleted. If you are an Team Admin, your company and projects will be deleted and are unrecoverable. You can transfer your company adminstration to another team member account if you wish to keep them.
          </p>
        </div>
        <div class="form-row df fdr">
          <span class="input-wrapper df fdc">
            <button v-on:click="deleteAccount()" class="button-form button-form-active">
              Delete Account
            </button>
          </span>
          <span class="input-wrapper df fdc">
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardProfile',
  data () {
    return {
      profileChangesMade: false,
      fullName: this.$store.getters.userData.fullName,
      company: this.$store.getters.companyName,
      phone: this.$store.getters.userData.phone,
      email: this.$store.getters.userData.email,
      address: this.$store.getters.userData.address,
      city: this.$store.getters.userData.city,
      country: this.$store.getters.userData.country,
      province: this.$store.getters.userData.province,
      postalCode: this.$store.getters.userData.postalCode,
      currentPassword: '',
      newPassword: '',
      newPasswordRepeat: ''
    }
  },
  props: [],
  components: {
  },
  methods: {
    changesMade () {
      this.profileChangesMade = true
    },
    deleteAccount () {
      var data = {}
      this.$store.dispatch('deleteUser', data).then(() => {
        console.log('After deleting user')
      })
    },
    updatePassword () {
      console.log('before update password')
      if ((this.newPassword === this.newPasswordRepeat) && this.newPassword.length > 7) {
        var data = {
          currentPassword: this.currentPassword,
          newPassword: this.newPassword
        }
        this.$store.dispatch('updatePassword', data).then(() => {
          // this.profileChangesMade = false
          console.log('After setting new password')
        })
      }
    },
    deletePhoto () {
      var data = {uid: this.$store.getters.uid}
      this.$store.dispatch('deletePhoto', data).then(() => {
        console.log('After deleting photo')
      })
    },
    uploadPhotoStart () {
      console.log('start photo upload')
      this.$refs.fileInput.click()
    },
    uploadPhotoContinue () {
      console.log('continue uploading photo')
      var inputElement = document.getElementById('fileUploadButton')
      var fileList = inputElement.files
      if (fileList[0]) {
        var data = {
          file: fileList[0],
          uid: this.$store.getters.uid
        }
        console.log('file exists')
        this.$store.dispatch('saveProfileImage', data).then(() => {
          // this.profileChangesMade = false
        })
      }
    },
    saveProfile () {
      var data = {
        uid: this.$store.getters.uid,
        fullName: this.fullName || '',
        company: this.company || '',
        phone: this.phone || '',
        email: this.email || '',
        address: this.address || '',
        city: this.city || '',
        country: this.country || '',
        province: this.province || '',
        postalCode: this.postalCode || ''
      }

      if (this.profileChangesMade) {
        this.$store.dispatch('saveProfile', data).then(() => {
          this.profileChangesMade = false
        })
      }
    }
  },
  created () {
    console.log('current user data', this.$store.getters.userData)
  }
}
</script>

<style scoped lang="scss">
h4 {
  margin-top: 75px;
}

.wrapper {
  width: 100%;
  min-height: unset;
}

.profile {
  padding: 50px;
}

.form-row {
  width: 100%;

  & > span {
  }
}

.input-wrapper {
  margin-bottom: 20px;
  margin-right: 40px;
  flex: 1;

  & > p {
    color: #000000;
    font-size: 14px;
    letter-spacing: 0.5px;
    line-height: 25px;
  }
}

.input-wrapper-inner {
  flex: 1px;
  width: 50%;

  & > span {
    margin-right: 0;

    &:first-child {
      margin-right: 30px;
    }
  }
}

.delete-account-text {
  color: #000000;
  font-size: 18px;
  letter-spacing: 0.64px;
  line-height: 25px;
  margin-bottom: 30px;
}

.profile-photo-inner {
  border-radius: 8px;
  background-color: white;
  padding: 50px;
  margin-right: 30px;
  box-shadow: 0 1px 4px 0 rgba(0,0,0,0.32);
}

.profile-image {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  object-position: center;
  object-fit: cover;
}

.profile-photo-details {
  flex: 1;
  margin-left: 50px;
}

.photo-buttons {
  & > button {
    &:first-child {
      margin-right: 40px;
    }
  }
}
</style>
