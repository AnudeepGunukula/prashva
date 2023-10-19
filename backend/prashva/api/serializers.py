from rest_framework.serializers import ModelSerializer
from api.models import Docket


class DocketSerializer(ModelSerializer):
    class Meta:
        model = Docket
        fields = "__all__"
