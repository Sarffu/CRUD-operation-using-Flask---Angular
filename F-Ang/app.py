from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///crud.db"
db = SQLAlchemy(app)
ma = Marshmallow(app)
CORS(app)


class Student(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(50))
    marks = db.Column(db.Integer())
    location = db.Column(db.Integer())


class StudentSchema(ma.Schema):
    class Meta:
        fields = ["id", "name", "marks", "location"]


student_schema = StudentSchema()
student_schemas = StudentSchema(many=True)


@app.route("/add", methods=["POST", "GET"])
def add():
    if request.method == "POST":
        data = request.json
        name = data["name"]
        marks = data["marks"]
        location = data["location"]
        new_student = Student(name=name, marks=marks, location=location)
        db.session.add(new_student)
        db.session.commit()
        # print(12)
        print(new_student)

        return jsonify({"msg": "Student Details added successfully!!"})
    return "wrong request!!"


@app.route("/get", methods=["GET"])
@app.route("/get/<int:id>", methods=["GET"])
def get_students(id=None):
    if id is not None:
        stud = Student.query.get(id)
        if stud:
            return student_schema.dump(stud)
        else:
            return jsonify({"msg": "Student not found"}), 404
    else:
        all_stud = Student.query.all()
        return student_schemas.dump(all_stud)


@app.route("/update/<int:id>", methods=["PUT"])
def update_data(id):

    post = Student.query.get(id)

    name = request.json["name"]
    marks = request.json["marks"]
    location = request.json["location"]

    post.name = name
    post.marks = marks
    post.location = location  # here key is concated with values...

    # db.session.add(post)
    db.session.commit()
    return student_schema.dump(post), 200


@app.route("/delete/<int:id>", methods=["DELETE"])
def delete(id):
    if request.method == "DELETE":
        student = Student.query.filter_by(id=id).delete()
        db.session.commit()  # delete(student)
        return jsonify({"msg": "Student Deleted !!"})
    return "Invalid Request Input.!"


with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)
