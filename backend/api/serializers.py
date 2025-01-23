from rest_framework import serializers
from .models import Staff, Student, Kit, Component, LabTransactions, Issues, Complaint


class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = ["staff_id", "type", "fname", "mname", "lname",
                  "email", "phno", "dept", "role", "pwd", "active"]


class StaffListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = ["staff_id", "type", "fname", "mname", "lname",
                  "email", "phno", "dept", "role", "active"]


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ["student_id", "fname", "mname", "lname", "usn",
                  "email", "dept", "semester", "pwd"]


class StudentListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ["student_id", "fname", "mname", "lname", "usn",
                  "email", "dept", "semester"]


class KitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Kit
        fields = ["kit_id", "description", "kit_qr", "status"]


class KitListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Kit
        fields = ["kit_id", "description", "kit_qr", "status"]


class ComponentListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Component
        fields = ["comp_id", "comp_name",
                  "status", "description", "kit", "url"]


class ComponentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Component
        fields = ['comp_name', 'status', 'kit']


class LabTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = LabTransactions
        fields = ["transaction_id", "status", "lab_date",
                  "checkin_time", "dept", "semester", "staff", "kit", "student"]


class LabTransactionListSerializer(serializers.ModelSerializer):
    class Meta:
        model = LabTransactions
        fields = ["transaction_id", "status", "lab_date", "checkin_time",
                  "checkout_time", "dept", "semester", "staff", "kit", "student"]


class IssueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Issues
        fields = ["issue_id", "description", "status", "reported_on",
                  "resolution", "res_datetime", "kit", "comp", "student", "complaint"]


class ComplaintSerializer(serializers.ModelSerializer):
    class Meta:
        model = Complaint
        fields = ['complaint_id', 'description', 'status']
