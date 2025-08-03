import { Routes } from '@angular/router';
import { AboutUsComponent } from './features/guest/about-us/about-us.component';
import { EnrollmentComponent } from './features/guest/enrollment/enrollment.component';
import { EducationComponent } from './features/guest/education/education.component';
import { HomepageComponent } from './features/homepage/homepage.component';
import { LoginComponent } from './core/login/login.component';
import { RegistrationComponent } from './core/registration/registration.component';
import { ProfilePageComponent } from './features/profile-page/profile-page.component';
import { StudyPlanComponent } from './features/student/study-plan/study-plan.component';
import {CoursesLabsComponent } from './features/student/courses-labs/courses-labs.component';
import { ExamsComponent } from './features/student/exams/exams.component';
import { DepDetailsComponent } from './features/guest/dep-details/dep-details.component';
import { TeachingPlanComponent } from './features/professor/teaching-plan/teaching-plan.component';
import { TeachingsComponent } from './features/professor/teachings/teachings.component';
import { EnrolledStudentsComponent } from './features/professor/enrolled-students/enrolled-students.component';


export const routes: Routes = [
    {
        path: "homepage",
        component: HomepageComponent
    },
    {
        path: '',
        redirectTo: '/homepage',
        pathMatch: 'full'
    },
    {
        path: "aboutUs",
        component: AboutUsComponent
    },
    {
        path: "enrollment",
        component: EnrollmentComponent
    },
    {
        path: "education",
        component: EducationComponent
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "register",
        component: RegistrationComponent
    },
    {
        path: "profilePage",
        component: ProfilePageComponent
    },
    {
        path: "studyPlan",
        component: StudyPlanComponent
    },
    {
        path: "courses-labs",
        component: CoursesLabsComponent
    },
    {
        path: "exams",
        component: ExamsComponent
    },
    {
        path: "dep-details/:id",
        component: DepDetailsComponent
    },
    {
        path: "teachingPlan",
        component: TeachingPlanComponent
    },
    {
        path: "teachings",
        component: TeachingsComponent
    },
    {
        path: "enrolledStuds",
        component: EnrolledStudentsComponent
    },
];
