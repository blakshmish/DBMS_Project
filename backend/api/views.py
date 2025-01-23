from django.shortcuts import render
from rest_framework import generics, views
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from django.db import connection


from .serializers import StaffSerializer, StaffListSerializer, IssueSerializer
from .serializers import StudentListSerializer, StudentSerializer
from .serializers import KitListSerializer, KitSerializer, ComplaintSerializer
from .serializers import LabTransactionSerializer, LabTransactionListSerializer, ComponentSerializer


from .models import Staff, Student, Kit, LabTransactions, Complaint, Issues, Component

# Create your views here.


class StaffCreateView(generics.CreateAPIView):
    serializer_class = StaffSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)


class StaffListView (generics.ListAPIView):
    serializer_class = StaffListSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Staff.objects.all()

# Staff Login view


class StaffLoginView (APIView):
    queryset = Staff.objects.all()
    serializer_class = StaffSerializer
    permission_classes = [AllowAny]
    looklookup_fields = ['email', 'pwd']

    def post(self, request):
        email = request.data["email"]
        pwd = request.data["pwd"]

        try:
            obj = Staff.objects.get(email=email, pwd=pwd)
            resp = StaffSerializer(obj)
            if (obj != None):
                return Response(resp.data, status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_404_NOT_FOUND)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)


class StudentCreateView(generics.CreateAPIView):
    serializer_class = StudentSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)


# need to add department and semester filters here
class StudentListView (generics.ListAPIView):
    serializer_class = StudentListSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        sem = self.kwargs.get('sem')
        dept = self.kwargs.get('dept')
        return Student.objects.filter(dept=dept, semester=sem)


# student Login view

class StudentLoginView (APIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [AllowAny]
    looklookup_fields = ['email', 'usn']

    def post(self, request):
        email = request.data["email"]
        usn = request.data["pwd"]
        try:
            obj = Student.objects.get(email=email, usn=usn)
            resp = StudentSerializer(obj)
            if (obj != None):
                return Response(resp.data, status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_404_NOT_FOUND)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)


class KitCreateView(generics.CreateAPIView):
    serializer_class = KitSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)


class KitListView (generics.ListAPIView):
    serializer_class = KitListSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Kit.objects.all()


class ActiveKitListView (generics.ListAPIView):
    serializer_class = KitListSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Kit.objects.filter(status=True)


class ComponentCreateView(generics.CreateAPIView):
    serializer_class = ComponentSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)


class ComponentListView (generics.ListAPIView):
    serializer_class = ComponentSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = Component.objects.all()
        kitId = self.request.query_params.get('kit_id')
        if kitId is not None:
            queryset = queryset.filter(kit_id=kitId)
        return queryset


class LabTransactionsCreateView(generics.CreateAPIView):
    serializer_class = LabTransactionSerializer
    permission_classes = [AllowAny]

    def perform_create(self, request):
        serializer = LabTransactionSerializer(data=request.data, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LabTransactionsListAllView (generics.ListAPIView):
    serializer_class = LabTransactionListSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = LabTransactions.objects.all()
        return queryset


class LabTransactionsListView (generics.ListAPIView):
    serializer_class = LabTransactionListSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = LabTransactions.objects.all()
        labdate = self.request.query_params.get('date')
        department = self.request.query_params.get('dept')
        sem = self.request.query_params.get('semester')
        if labdate is not None:
            queryset = queryset.filter(lab_date=labdate)
        if department is not None:
            queryset = queryset.filter(dept=department)
        if sem is not None:
            queryset = queryset.filter(semester=sem)
        return queryset


class IssueCreateView(generics.CreateAPIView):
    serializer_class = IssueSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)


class IssuesListView (generics.ListAPIView):
    serializer_class = IssueSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = Issues.objects.all()
        issue_status = self.request.query_params.get('status')
        if issue_status is not None:
            queryset = queryset.filter(status=issue_status)
        return queryset


class IssueUpdateView(generics.UpdateAPIView):
    def patch(self, request, pk):
        try:
            issue = Issues.objects.get(pk=pk)
        except Issues.DoesNotExist:
            return Response({'error': 'Issue not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = ComplaintSerializer(
            issue, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        try:
            issue = Issues.objects.get(pk=pk)
        except Issues.DoesNotExist:
            return Response({'error': 'Issue not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = ComplaintSerializer(
            issue, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ComplaintCreateView(APIView):
    def post(self, request):
        serializer = ComplaintSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ComplaintListView (generics.ListAPIView):
    serializer_class = ComplaintSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = Complaint.objects.all()
        return queryset


class ComplaintUpdateView(generics.UpdateAPIView):
    def patch(self, request, pk):
        try:
            complaint = Complaint.objects.get(pk=pk)
        except Complaint.DoesNotExist:
            return Response({'error': 'Complaint not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = ComplaintSerializer(
            complaint, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        try:
            complaint = Complaint.objects.get(pk=pk)
        except Complaint.DoesNotExist:
            return Response({'error': 'Complaint not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = ComplaintSerializer(
            complaint, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
