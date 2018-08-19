import { $, viewEXT, getAge } from '../../../common/js/global.js'
import * as config from '../index/config'
import School from '../../../class/school.class'
import { appCacheKey, appStorageKey } from '../../../class/enum'
import Vue from 'vue'
import Component from 'vue-class-component'

//
@Component({
  template: require('../index/root.vue.html'),
  watch: {
    classesId: function (this: Vue, classesId: number, oldClassesId) {
      const school = new School()
      // classesName
      school.getClasses((lists) => {
        for (const one of lists) {
          if (one.id === classesId) {
            this.$data.classesName = one.classesname
            break
          }
        }
      })
      // teacher
      school.getTeacherByClassesid(classesId, (lists: any[]) => {
        if (lists.length === 0) return

        let teacherLists = []
        lists.forEach((one) => {
          let tmp = {}
          tmp['id'] = one.id
          tmp['teacherpost'] = one.teacherpost
          tmp['truename'] = one.truename
          tmp['avatar'] = one.avatar
          if (!tmp['avatar']) tmp['avatar'] = '../../static/images/defaultAvatar.png'

          teacherLists.push(tmp)
        })
        this.$data.teacherLists = teacherLists
      })
      // student
      school.getStudentByClassesid(classesId, (lists: any[]) => {
        if (lists.length === 0 || !lists[0].id) return

        let studentLists = []
        lists.forEach((one) => {
          let tmp = {}
          tmp['id'] = one.id
          tmp['babyname'] = one.babyname
          tmp['avatar'] = one.avatar
          if (!tmp['avatar']) tmp['avatar'] = '../../static/images/defaultAvatar.png'
          tmp['gender'] = school.getGender(one.gender)
          tmp['age'] = getAge(one.birthday + ' 1:1:1', school.getFormatDate() + ' 1:1:1')

          studentLists.push(tmp)
        })
        this.$data.studentLists = studentLists
      })
    }
  }
})
export default class Index extends Vue {
  public classesId: number = 0
  public classesName = ''
  public teacherLists: any[] = []
  public studentLists: any[] = []
  private school: School

  constructor () {
    super()
    this.school = new School()
  }

  public get totalTeacher () {
    return this.teacherLists.length
  }

  public get totalStudent () {
    return this.studentLists.length
  }

  public mounted (): void {
    this.$nextTick(() => {
      this.classesId = this.school.getStorage(appStorageKey.current_jiaowu_classesid)
      if (!this.classesId) this.classesId = 0

      // getClasses
      this.school.getClasses((lists) => {
        if (lists.length === 0) {
          this.classesName = '您还未添加班级'
          return
        }

        if (this.classesId === 0) {
          this.classesId = lists[0].id
          this.classesName = lists[0].classesname
          this.school.setStorage(appStorageKey.current_jiaowu_classesid, this.classesId)
        } else {
          for (const one of lists) {
            if (one.id === this.classesId) {
              this.classesName = one.classesname
              break
            }
          }
        }
      })
    })
  }
}
