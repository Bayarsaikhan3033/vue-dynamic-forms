(window.webpackJsonp = window.webpackJsonp || []).push([
  [20],
  {
    344: function (t, a, e) {},
    401: function (t, a, e) {
      'use strict';
      var s = e(344);
      e.n(s).a;
    },
    423: function (t, a, e) {
      'use strict';
      e.r(a);
      var s = e(303),
        o = {
          name: 'ValidationPatternDemo',
          components: { DynamicForm: s.DynamicForm },
          data: function () {
            return {
              formData: null,
              testForm: {
                id: 'validation-pattern-demo',
                fields: [
                  new s.FormField({
                    type: 'password',
                    label: 'Password',
                    name: 'password',
                    customClass: 'col-12',
                    validations: [
                      new s.FormValidation(
                        Object(s.pattern)(
                          '^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[#$^+=!*()@%&]).{8,10}$',
                        ),
                        'Password must contain at least 1 Uppercase, 1 Lowercase, 1 number, 1 special character and min 8 characters max 10',
                      ),
                    ],
                    value: 'sdsdsd',
                  }),
                ],
                options: new s.FormOptions({ autoValidate: !0 }),
              },
            };
          },
          methods: {
            updateForm: function (t) {
              this.formData = t;
            },
          },
        },
        n = (e(401), e(44)),
        i = Object(n.a)(
          o,
          function () {
            var t = this,
              a = t.$createElement,
              e = t._self._c || a;
            return e(
              'div',
              { staticClass: 'form-composition library-example' },
              [
                e(
                  'div',
                  { staticClass: 'col' },
                  [
                    e('dynamic-form', {
                      attrs: {
                        id: t.testForm.id,
                        fields: t.testForm.fields,
                        options: t.testForm.options,
                      },
                      on: { change: t.updateForm },
                    }),
                    t._v(' '),
                    e('p', { staticClass: 'hint' }, [
                      t._v(
                        '\n      Please change the value and press enter (blur) to see the validation working 👆🏻\n    ',
                      ),
                    ]),
                  ],
                  1,
                ),
                t._v(' '),
                e('div', { staticClass: 'col' }, [
                  e('pre', [t._v(t._s(t.formData))]),
                ]),
              ],
            );
          },
          [],
          !1,
          null,
          null,
          null,
        );
      a.default = i.exports;
    },
  },
]);
