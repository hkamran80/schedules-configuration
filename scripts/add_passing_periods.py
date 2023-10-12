import json, datetime, copy

FIELD_ORDER = [
    "name",
    "shortName",
    "color",
    "timezone",
    "location",
    "type",
    "schedule",
    "offDays",
    "overrides",
]


def get_period_times(period) -> list[str]:
    if type(period) == dict:
        return period["times"]

    return period


def get_time(schedule_time: str) -> datetime:
    hour, minute, second = [int(i) for i in schedule_time.split(":")]

    d = datetime.datetime.now()
    return datetime.datetime(
        year=d.year, month=d.month, day=d.day, hour=hour, minute=minute, second=second
    )


def calculate_offset(d: datetime, seconds: int) -> str:
    return (d - datetime.timedelta(seconds=seconds)).isoformat().split("T")[1]


insert = lambda _dict, obj, pos: {
    k: v
    for k, v in (
        list(_dict.items())[:pos] + list(obj.items()) + list(_dict.items())[pos:]
    )
}

if __name__ == "__main__":
    with open("schedules-v3d.json", "r") as s3d:
        schedules = json.loads(s3d.read())

    modified_schedules = copy.deepcopy(schedules)
    for schedule_id in modified_schedules:
        del modified_schedules[schedule_id]["schedule"]

        schedules_object = schedules[schedule_id]["schedule"]
        modified_schedules_object = {k: {} for k in list(schedules_object.keys())}

        for day in schedules_object:
            day_schedule_object = schedules_object[day]
            modified_day_schedule_object = copy.deepcopy(day_schedule_object)

            schedule_keys = list(day_schedule_object.keys())
            passing_periods = 0

            for index, period in enumerate(day_schedule_object):
                if index != len(day_schedule_object) - 1:
                    current_period = get_period_times(day_schedule_object[period])
                    next_period = get_period_times(
                        day_schedule_object[schedule_keys[index + 1]]
                    )

                    passing_start = calculate_offset(get_time(current_period[1]), -1)
                    if passing_start != next_period[0]:
                        passing_end = calculate_offset(
                            get_time(next_period[0]),
                            1,
                        )

                        modified_day_schedule_object = insert(
                            modified_day_schedule_object,
                            {
                                f"Passing ({period} / {schedule_keys[index+1]})": [
                                    passing_start,
                                    passing_end,
                                ]
                            },
                            index + 1 + passing_periods,
                        )
                        passing_periods += 1

            modified_schedules_object[day] = modified_day_schedule_object

        modified_schedules[schedule_id]["schedule"] = modified_schedules_object
        modified_schedules[schedule_id] = dict(
            [(f, modified_schedules[schedule_id].get(f)) for f in FIELD_ORDER]
        )

    with open("schedules-v3.json", "w") as s3:
        s3.write(json.dumps(modified_schedules))
