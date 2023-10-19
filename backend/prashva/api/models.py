from django.db import models


class Docket(models.Model):
    name = models.CharField(max_length=255)
    start_time = models.TimeField()
    end_time = models.TimeField()
    hours_worked = models.DecimalField(max_digits=5, decimal_places=2)
    rate_per_hour = models.DecimalField(max_digits=10, decimal_places=2)
    supplier_name = models.CharField(max_length=255)
    purchase_order = models.CharField(max_length=255)
    po_desc = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.name
