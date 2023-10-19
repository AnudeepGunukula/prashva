from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_500_INTERNAL_SERVER_ERROR,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST,
)
from rest_framework.response import Response
import pandas as pd

from api.models import Docket
from api.serializers import DocketSerializer

# Create your views here.


class CleanXlView(APIView):
    def get(self, request):
        df = pd.read_excel("api/data/export29913.xlsx")
        df_filled = df.fillna(method="ffill")
        df_filled.to_excel("api/data/export29913.xlsx", index=False)

        return Response({"data": "successfully cleaned excel data"}, status=HTTP_200_OK)


class SuppliersListView(APIView):
    def get(self, request):
        df = pd.read_excel("api/data/export29913.xlsx")
        suppliers = df["Supplier"].unique()
        return Response({"suppliers": suppliers}, status=HTTP_200_OK)


class SuppliersDetailView(APIView):
    def get(self, request):
        pk = request.GET.get("supplier", "")
        df = pd.read_excel("api/data/export29913.xlsx")
        purchaseOrders = df[df["Supplier"] == pk]["PO Number"].unique().tolist()
        return Response({"PurchaseOrders": purchaseOrders})


class DocketListView(APIView):
    def get(self, request):
        dockets = Docket.objects.all()
        serializer = DocketSerializer(dockets, many=True)
        return Response(serializer.data, status=HTTP_200_OK)

    def post(self, request):
        df = pd.read_excel("api/data/export29913.xlsx")
        matching_row = df[df["PO Number"] == request.data["purchase_order"]]
        if not matching_row.empty:
            description_value = matching_row["Description"].values[0]
            request.data["po_desc"] = description_value
        serializer = DocketSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
