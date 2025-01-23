from django.db import models
from django.db.models.constraints import CheckConstraint, Q

# Create your models here.


class Staff(models.Model):
    staff_id = models.AutoField(db_column='staff_id', primary_key=True)
    type = models.CharField(
        db_column='type', max_length=50, blank=True, null=False)
    fname = models.CharField(
        db_column='fname', max_length=50, blank=True, null=False)
    mname = models.CharField(
        db_column='mname', max_length=50, blank=True, null=True)
    lname = models.CharField(
        db_column='lname', max_length=50, blank=True, null=True)
    email = models.CharField(
        db_column='email', max_length=100, blank=True, null=True)
    phno = models.CharField(
        db_column='phno', max_length=50, blank=True, null=True)
    dept = models.CharField(
        db_column='dept', max_length=50, blank=True, null=True)
    role = models.CharField(
        db_column='role', max_length=50, blank=True, null=True)
    pwd = models.CharField(
        db_column='pwd', max_length=50, blank=True, null=False)
    active = models.BooleanField(
        db_column='status', blank=True, default=True, null=False)

    class Meta:
        db_table = 'staff'


class Student(models.Model):
    student_id = models.AutoField(db_column='student_id', primary_key=True)
    fname = models.CharField(
        db_column='fname', max_length=50, blank=True, null=False)
    mname = models.CharField(
        db_column='mname', max_length=50, blank=True, null=True)
    lname = models.CharField(
        db_column='lname', max_length=50, blank=True, null=True)
    usn = models.CharField(
        db_column='usn', max_length=50, blank=True, null=False)
    email = models.CharField(
        db_column='email', max_length=50, blank=True, null=True)
    dept = models.CharField(
        db_column='dept', max_length=50, blank=True, null=True)
    semester = models.IntegerField(db_column='SEMESTER', null=True)
    pwd = models.CharField(
        db_column='pwd', max_length=50, blank=True, null=True)

    class Meta:
        db_table = 'student'


class Kit(models.Model):
    kit_id = models.AutoField(db_column='kit_id', primary_key=True)
    description = models.TextField(
        db_column='description', blank=True, null=True)
    kit_qr = models.TextField(db_column='kit_qr', blank=True, null=True)
    status = models.BooleanField(
        db_column='status', blank=True, default=True, null=True)
    allotted = models.BooleanField(
        db_column='allotted', blank=True, default=True, null=True)

    class Meta:
        db_table = 'kit'


class Component(models.Model):
    comp_id = models.AutoField(db_column='comp_id', primary_key=True)
    comp_name = models.CharField(db_column='comp_name', max_length=250)
    status = models.CharField(db_column='status', max_length=1)
    description = models.TextField(
        db_column='description', blank=True, null=True)
    kit = models.ForeignKey('Kit', models.DO_NOTHING, db_column="kit_id")
    url = models.CharField(
        db_column='url', max_length=255, blank=True, null=True)

    class Meta:
        db_table = 'component'
        constraints = [
            CheckConstraint(
                check=Q(status__in=['G', 'D', 'O']),
                name='chk_sensor_status',
            ),
        ]


class Complaint(models.Model):
    complaint_id = models.AutoField(db_column='complaint_id', primary_key=True)
    description = models.TextField(db_column='description')
    status = models.BooleanField(db_column='status', default=True)

    class Meta:
        db_table = 'complaint'


class Issues(models.Model):
    issue_id = models.AutoField(db_column='issue_id', primary_key=True)
    description = models.CharField(db_column='description', max_length=255)
    status = models.CharField(db_column='status', max_length=1)
    reported_on = models.DateTimeField(db_column='reported_on')
    resolution = models.CharField(
        db_column='resolution', max_length=255, blank=True, null=True)
    res_datetime = models.DateTimeField(
        db_column='res_datetime', blank=True, null=True)
    kit = models.ForeignKey('Kit', models.DO_NOTHING)
    comp = models.ForeignKey('Component', models.DO_NOTHING)
    student = models.ForeignKey('Student', models.DO_NOTHING)
    complaint = models.ForeignKey('Complaint', models.DO_NOTHING)

    class Meta:
        db_table = 'issues'
        constraints = [
            CheckConstraint(
                check=Q(status__in=['O', 'C', 'S']),
                name='chk_issues_status',
            ),
        ]


class LabTransactions(models.Model):
    transaction_id = models.AutoField(
        db_column='transaction_id', primary_key=True)
    lab_date = models.DateField(db_column='lab_date', null=False)
    status = models.BooleanField(db_column='status', default=True)
    checkin_time = models.DateTimeField(
        db_column='checkin_time', null=False)
    checkout_time = models.DateTimeField(
        db_column='checkout_time', blank=True, null=True)
    dept = models.CharField(
        db_column='dept', max_length=50, blank=True, null=True)
    semester = models.IntegerField(db_column='semester', null=True)
    staff = models.ForeignKey('Staff', models.DO_NOTHING, db_column='staff_id')
    kit = models.ForeignKey('Kit', models.DO_NOTHING, db_column='kit_id')
    student = models.ForeignKey(
        'Student', models.DO_NOTHING, db_column='student_id')

    class Meta:
        db_table = 'lab_transactions'
