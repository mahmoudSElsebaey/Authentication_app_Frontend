import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: { ...data },
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: { ...data },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } = authApiSlice;

//-------------------------------------------  شرح الكود --------------------------------------------------//
// في هذا الملف نقوم بإنشاء شريحة API جديدة خاصة بالمصادقة (auth) باستخدام Redux Toolkit Query.
// نقوم بحقن نقاط النهاية (endpoints) في الشريحة الأساسية apiSlice التي تم إنشاؤها مسبقًا.
// هنا، نعرف نقطة نهاية واحدة وهي "register" التي تستخدم طريقة POST لإرسال بيانات التسجيل إلى الخادم.
// الدالة useRegisterMutation التي يتم تصديرها في النهاية تُستخدم في المكونات React لإجراء طلب التسجيل بسهولة.
// عند استدعاء useRegisterMutation في مكون، يمكننا إرسال بيانات المستخدم إلى نقطة النهاية "/auth/register" للحصول على استجابة من الخادم.
