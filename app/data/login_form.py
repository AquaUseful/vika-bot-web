import flask_wtf
import wtforms
from wtforms import validators


class LoginForm(flask_wtf.FlaskForm):
    token = wtforms.TextAreaField(
        "Token", validators=[validators.DataRequired()])
    submit = wtforms.SubmitField("Verify")
