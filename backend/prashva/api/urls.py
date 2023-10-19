from django.contrib import admin
from django.urls import include, path
from api.views import (
    CleanXlView,
    SuppliersListView,
    SuppliersDetailView,
    DocketListView,
)

urlpatterns = [
    path("cleanxl", CleanXlView.as_view()),
    path("suppliers", SuppliersListView.as_view()),
    path("suppliers/", SuppliersDetailView.as_view()),
    path("dockets/", DocketListView.as_view()),
]
