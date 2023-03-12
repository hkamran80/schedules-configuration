You must be on a computer to follow these instructions. You cannot follow these
instructions on your phone.

1. If you don't already have one, create a GitHub account
2. Fork the [Schedules configuration repository](https://github.com/hkamran80/schedules-configuration)
    - A "fork" is a copy of a repository
    - A repository is essentially a giant folder
3. Go into the folder `helpcenter-topics` and click `Add file` then `Create new file`
4. Create an ID for your topic and set it as the filename
    - The ID should be all lowercase and have no spaces. Instead of spaces, use
      dashes (`-`).
    - Example: This help topic has the ID `add-topic` and the installation topic
      has the ID of `install`.
5. Add content
    - You can look at this topic's and the installation's topic's content in the
      repository
6. Commit your changes
7. Go into the root folder and edit the `helpcenter-topics.json`
8. At the bottom of the file, before the last curly brace (`}`), add the following:

    ```json
    {
        "id": "[topic ID]",
        "name": "[topic name]",
        "description": "[topic description]",
        "videoLink": null
    }
    ```

    - Replace `[topic ID]` with the ID you created in step 4, and come up with a
      name and description for your topic
    - Make sure to put a comma at the end of the previous curly brace
9. Commit your changes at the bottom
10. Click on the `Pull requests` tab
11. Click `New pull request`
12. Make sure the base repository is set to `hkamran80/schedules-configuration`,
    the base is `main`, and the head repository is `[your GitHub username]/schedules-configuration`
13. If all the values are the same, click `Create pull request`
14. Change the title to `New Topic: [your topic name]` and in the description, give
    a brief description of the topic
15. Click on `Assignees` in the sidebar, then click `hkamran80`
16. Click `Create pull request`

If you need any help during this process, join the [Discord server](https://discord.gg/M586RvpCWP)
and ask for help in the `#schedules` channel (in the Creations category).
