import { Routes } from '@angular/router';
import { AboutUsComponent } from './features/about-us/about-us.component';
import { EnrollmentComponent } from './features/enrollment/enrollment.component';
import { EducationComponent } from './features/education/education.component';
import { HomepageComponent } from './features/homepage/homepage.component';
import { LoginComponent } from './core/login/login.component';
import { RegistrationComponent } from './core/registration/registration.component';
import { ProfilePageComponent } from './features/profile-page/profile-page.component';
import { StudyPlanComponent } from './features/study-plan/study-plan.component';
import { CoursesComponent } from './features/courses/courses.component';
import { LaboratoriesComponent } from './features/laboratories/laboratories.component';
import { ExamsComponent } from './features/exams/exams.component';

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
        path: "courses",
        component: CoursesComponent
    },
    {
        path: "laboratories",
        component: LaboratoriesComponent
    },
    {
        path: "exams",
        component: ExamsComponent
    },
];
