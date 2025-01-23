from django.urls import path
from . import views

urlpatterns = [
    path("staff/create/", views.StaffCreateView.as_view(), name="staff-create"),
    path("staff/", views.StaffListView.as_view(), name="staff-list"),
    path("staffLogin/", views.StaffLoginView.as_view(), name="staff-login"),

    path("student/create/", views.StudentCreateView.as_view(), name="student-create"),
    path("students/<dept>/<sem>/",
         views.StudentListView.as_view(), name="student-list"),
    path("studentLogin/", views.StudentLoginView.as_view(), name="student-login"),

    path("kit/create/", views.KitCreateView.as_view(), name="kit-create"),
    path("kits/", views.KitListView.as_view(), name="kit-list"),
    path("active-kits/", views.ActiveKitListView.as_view(), name="active-kit-list"),

    path("component/create/", views.ComponentCreateView.as_view(),
         name="component-create"),
    path("components/<kitId>/", views.ComponentListView.as_view(),
         name="component-list"),

    path("lab/transaction/create/",
         views.LabTransactionsCreateView.as_view(), name="lab-transaction"),
    path("lab/transactions/",
         views.LabTransactionsListAllView.as_view(), name="lab-transactions-list"),
    path("lab/transaction/<date>/<dept>/<semester>",
         views.LabTransactionsListView.as_view(), name="lab-transaction-list"),

    path("issue/create/", views.IssueCreateView.as_view(),
         name="issue-create"),
    path("issue/update/<int:pk>", views.IssueUpdateView.as_view(),
         name="issue-update"),
    path("issue/<status>/", views.IssuesListView.as_view(),
         name="component-list"),

    path("complaint/create/", views.ComplaintCreateView.as_view(),
         name="complaint-create"),
    path("complaints/", views.ComplaintListView.as_view(),
         name="complaint-list"),
    path("complaint/update/<int:pk>", views.ComplaintUpdateView.as_view(),
         name="complaint-update"),
]
