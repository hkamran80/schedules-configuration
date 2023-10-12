# Schedules Configuration

This is the home of [Schedules](https://go.unisontech.org/sch)' configuration. The
schedules, schema, and help center topics are all stored here.

## Contributions

If you would like to update Schedules' configuration, please
[fork this repository](https://github.com/hkamran80/schedules-configuration/fork),
make your contributions, then submit a pull request ([learn about pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)).

It's recommended to use [Visual Studio Code](https://code.visualstudio.com/) to
make any changes.

**Note:** These guides assume basic familiarity with [JSON](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON),
[Git](https://learn.microsoft.com/en-us/devops/develop/git/what-is-git), and [GitHub](https://docs.github.com/en/get-started).

Before submitting a pull request, make sure to run `scripts/add_passing_periods.py`.

### Add a New Schedule

Once you have made all your changes, create a pull request to have it added to Schedules.

To add a new schedule, open the `schedules-v3.json` file. Add the end of the root
JSON object, add a new object with a string key. This key should be generated using
this formula: `[state/province abbreviation]-[school district]-[school abbreviation]`.
In this case of The Woodlands College Park High School, the key is `tx-conroeisd-twcp`.
If the bell schedule you're adding has multiple lunch periods or something similar,
use variant schedules by adding a dash (`-`) then a unique identifier. For example,
The Woodlands College Park High School bell schedule has four variants, each variant
being named for the accompanying lunch periods (e.g. `tx-conroeisd-twcp-a`,
`tx-conroeisd-twcp-b`, etc.).

Next, you need to add the required properties. An explanation of each key and its
type are in the following table.

| Key         | Description                                                                                                                                           | Type     |
|-------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|----------|
| `name`      | The name of the school (if the schedule is a variant, add the full name of the variant in parantheses)                                                | `string` |
| `shortName` | A shorter name that allows the schedule to be recognized at a glance (if the schedule is a variant, add the short name of the variant in parantheses) | `string` |
| `color`     | A hexadecimal colour code that is the main colour of the school                                                                                       | `string` |
| `timezone`  | A valid `tz` database timezone (see the [list](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones))                                         | `string` |
| `location`  | The general location of the school                                                                                                                    | `string` |
| `type`      | Valid options are `elementary`, `middle`, `high`, `primary` (non-U.S. schools only), and `secondary` (non-U.S. schools only)                          | `string` |
| `schedule`  | The actual schedule, described in depth later                                                                                                         | `object` |
| `offDays`   | A list of days the schedule has declared as holidays                                                                                                  | `object` |
| `overrides` | A list of days for which the schedule's predefined day should be overriden for                                                                        | `object` |

An example object is below.

```json
{
    "name": "The Woodlands College Park High School (A-Lunch)",
    "shortName": "College Park (A)",
    "color": "#002868",
    "timezone": "America/Chicago",
    "location": "The Woodlands, TX",
    "type": "high",
    "schedule": {},
    "offDays": {},
    "overrides": {}
}
```

#### The `schedule` object

You now need to add the most important part: the actual bell schedule, stored in
the `schedule` object. In the object, add empty objects with keys such as `MON`,
`TUE`, and so on, so forth. Any custom day schedules, e.g. final schedules, half-day
schedules, etc., can also be linked here. Inside each day schedule, a key to an
array or object for each period should be specified. This key should be the written
out form of the period number (e.g. "First" instead "1st"). Passing periods must
be included, and must be named in the format of
`Passing ([preceding period] / [following period])`.

If the period should not allow users to set the name (e.g. break, lunch,
homeroom, etc.), use an object: `{"times": [], "allowEditing": false}`. If it should
allow renaming by users, use an array. The array, also what should be in the `times`
key of the object, is a two-element array comprised of the start time and end time.
Due to the unintelligent nature of Schedules currently, you must supply seconds.
Therefore, times must be in the format of `hours:minutes:seconds`, with leading
zeros if the number is less than 10. All end time seconds should be `00`, and for
all periods after the first listed period, the start time's seconds should be `01`.
An example follows below.

```json
{
    "First Period": ["08:30:00", "09:15:00"],
    "Break": {"times": ["09:15:01", "09:25:00"], "allowEditing": false},
    "Passing (Break / Second Period)": ["09:15:01", "09:20:00"],
}
```

Repeat this process for each day. An example for Monday in College Park (A) schedule
is below.

```json
{
    "First Period": ["07:20:00", "08:07:00"],
    "Passing (First Period / Second Period)": [
        "08:07:01",
        "08:14:00"
    ],
    "Second Period": ["08:14:01", "09:00:00"],
    "Passing (Second Period / Third Period)": [
        "09:00:01",
        "09:07:00"
    ],
    "Third Period": ["09:07:01", "09:53:00"],
    "Passing (Third Period / Fourth Period)": [
        "09:53:01",
        "10:00:00"
    ],
    "Fourth Period": ["10:00:01", "10:46:00"],
    "Lunch": {
        "times": ["10:46:01", "11:17:00"],
        "allowEditing": false
    },
    "Passing (Lunch / Advisory)": ["11:17:01", "11:24:00"],
    "Advisory": {
        "times": ["11:24:01", "11:52:00"],
        "allowEditing": false
    },
    "Fifth Period": ["11:52:01", "12:49:00"],
    "Passing (Fifth Period / Sixth Period)": [
        "12:49:01",
        "12:56:00"
    ],
    "Sixth Period": ["12:56:01", "13:42:00"],
    "Passing (Sixth Period / Seventh Period)": [
        "13:42:01",
        "13:49:00"
    ],
    "Seventh Period": ["13:49:01", "14:35:00"]
}
```

Ensure that you use the same period names throughout the schedule. For custom day
schedules, set the day's key to a short uppercase identifier, e.g. `FINAL1`, then
add periods normally.

#### Off Days

To add off days, use the `offDays` object, and add keys for each holiday. If multiple
holidays have the same name, add a suffix with a number. (e.g. "Staff Development
Day 1" and "Staff Development Day 2"). Each key should be associated with an array
of length 1 or length 2. Single-element arrays should be used for single days (e.g.
Memorial Day), and two-element arrays should be used for holidays that span multiple
days. All dates should be in the format of `YYYY-MM-DD`. An example of both types
follows.

```json
{
    "Spring Break": ["2023-03-13", "2023-03-17"],
    "Memorial Day": ["2023-05-29"]
}
```

#### Overrides

There are some days that may need to be overridden, e.g. for final schedules, or
if the school decides to change a week's schedule because of a holiday. These take
a date (in the format of `YYYY-MM-DD`) and associate with a day's key from the `schedule`
object.

```json
{
    "2022-11-07": "WED",
    "2022-12-13": "FINAL1",
    "2022-12-14": "FINAL2",
    "2022-12-15": "FINAL3",
    "2022-12-16": "FINAL4",
    "2023-01-04": "MON",
    "2023-02-13": "FRI"
}
```

#### Notes

Take a look at the [schedules file](schedules-v3.json) if you want to see any examples.
If your IDE supports [JSON schemas](https://json-schema.org/),
point it to [`schedules.schema.json`](schedules.schema.json). If you use Visual Studio
Code, the schema will be automatically picked up.
