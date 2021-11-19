import requests
import json


def view():
    header = {"Content-Type": "application/json; charset=utf-8",
              "Authorization": "Basic NGEwMGZmMjItY2NkNy0xMWUzLTk5ZDUtMDAwYzI5NDBlNjJj"}

    payload = {"app_id": "5eb5a37e-b458-11e3-ac11-000c2940e62c",
               "included_segments": ["Subscribed Users"],
               "contents": {"en": "English Message"}}

    req = requests.post("https://onesignal.com/api/v1/notifications", headers=header, data=json.dumps(payload))
    print(req.status_code, req.reason)