document.addEventListener("DOMContentLoaded",function() {
    app1 = new Vue({
        el: '#app',
        data: {
            message: 'Hello Vue.js'
        }
    })

		vm = new Vue({
		  el: '#example',
		  data: {
		    message: 'Hello'
		  },
		  // computed: {
		  //   // 算出 getter 関数
		  //   reversedMessage: function () {
		  //     // `this` は vm インスタンスを指します
		  //     return this.message.split('').reverse().join('')
		  //   }
		  // }
			
			methods: {
				// 算出 getter 関数
				reversedMessage: function () {
					// `this` は vm インスタンスを指します
					return this.message.split('').reverse().join('')
				}
			}
		})

		vm2 = new Vue({
		   el: '#demo',
		   data: {
		     firstName: 'Foo',
		     lastName: 'Bar'
		   },
		   // watch: {
		   //   firstName: function (val) {
		   //     this.fullName = val + ' ' + this.lastName
		   //   },
		   //   lastName: function (val) {
		   //     this.fullName = this.firstName + ' ' + val
		   //   }
		   // }
			 computed: {
			   fullName: {
			     // getter 関数
			     get: function () {
			       return this.firstName + ' ' + this.lastName
			     },
			     // setter 関数
			     set: function (newValue) {
			       var names = newValue.split(' ')
			       this.firstName = names[0]
			       this.lastName = names[names.length - 1]
			     }
			   }
       }
		 })

		 watchExampleVM = new Vue({
		   el: '#watch-example',
		   data: {
		     question: '',
		     answer: 'I cannot give you an answer until you ask a question!'
		   },
		   watch: {
		     // この関数は question が変わるごとに実行されます。
		     question: function (newQuestion, oldQuestion) {
		       this.answer = 'Waiting for you to stop typing...'
		       this.debouncedGetAnswer()
		     }
		   },
		   created: function () {
		     // _.debounce は特にコストの高い処理の実行を制御するための
		     // lodash の関数です。この場合は、どのくらい頻繁に yesno.wtf/api
		     // へのアクセスすべきかを制限するために、ユーザーの入力が完全に
		     // 終わるのを待ってから ajax リクエストを実行しています。
		     // _.debounce (とその親戚である _.throttle )  についての詳細は
		     // https://lodash.com/docs#debounce を見てください。
		     this.debouncedGetAnswer = _.debounce(this.getAnswer, 500)
		   },
		   methods: {
		     getAnswer: function () {
		       if (this.question.indexOf('?') === -1) {
		         this.answer = 'Questions usually contain a question mark. ;-)'
		         return
		       }
		       this.answer = 'Thinking...'
		       var vm = this
		       axios.get('https://yesno.wtf/api')
		         .then(function (response) {
		           vm.answer = _.capitalize(response.data.answer)
		         })
		         .catch(function (error) {
		           vm.answer = 'Error! Could not reach the API. ' + error
		         })
		     }
		   }
		 })

     app2 = new Vue({
       el: '#class_example',
			 data: {
			   isActive: true,
			   error: null
			 },
			 computed: {
			   classObject: function () {
			     return {
			       active: this.isActive && !this.error,
			       'text-danger': this.error && this.error.type === 'fatal'
			     }
			   }
			 }
     })

     array_example = new Vue({
       el: '#array_class_example',
			 data: {
        isActive: false,
			  activeClass: 'active',
			  errorClass: 'text-danger'
			}
     })

     forExample = new Vue({
       el: "#for_example",
       data: {
         items: [
           {id: 1, val: "hoge"},
	         {id: 2, val: "fuga"},
         ]
       },
       computed: {
         filteredItems: function () {
					 return this.items.filter(function (item) {
				     return item.id % 2 === 0
				   })
         }
       }
     })
})
