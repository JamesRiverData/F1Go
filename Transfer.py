import requests
import asyncio

import json
async def debug_and_send(object_list):
    for idx, obj in enumerate(object_list):
        print(f"\nObject {idx+1}/{len(object_list)}:")
        print(json.dumps(obj, indent=2))
        user_input = input("Send this object? (y/n): ").lower()
        if user_input != 'y':
            print("Stopping so you can debug...")
            break
    else:
        print("\n✅ All objects reviewed. Now sending full request...")



async def update_attendee_type(attendee_id):
    # Step 1: GET attendee details
    get_url = f'https://api.brushfire.com/attendees/{attendee_id}'
    headers = {
        'accept': 'application/json',
        'Authorization': 'wb6fy7pt8gh7km3j',
        'api-version': '2025-02-24'
    }

    get_response = requests.get(get_url, headers=headers)

    if get_response.status_code != 200:
        print(f"❌ Failed to fetch attendee. Status code: {get_response.status_code}")
        print(get_response.text)
        return False  # Fetch failed, no update done

    attendee_data = get_response.json()

    # Extract TypeId from the response
    type_id = attendee_data.get('TypeId')
    if not type_id:
        print("❌ No TypeId found in attendee data.")
        return False

    # Step 2: Decide what to update to
    new_type_id = None

    if type_id == "08752e3c-ae2c-4155-8a59-d1d87f493161":
        new_type_id = "10cf42fe-c8e8-4314-a5b1-c67d7531d971"
    elif type_id == "2419b441-7d5d-4c9e-b817-665ea50b057c":
        new_type_id = "0bc9f20a-4de8-43db-9052-82fd9ceb9f3b"
    
    # If it's not one of the two IDs, do nothing and return
    if not new_type_id:
        print(f"⚠️ TypeId {type_id} does not match any known mappings. No update made.")
        return True  # Just return True to indicate no error, no action taken

    # Step 3: POST update if needed
    post_url = f'https://api.brushfire.com/attendees/{attendee_id}/type'
    post_headers = {
        'accept': 'application/json',
        'Authorization': 'wb6fy7pt8gh7km3j',
        'Content-Type': 'application/json',
        'api-version': '2025-02-24'
    }
    payload = {
        "AccessKey": "pr2qd6tb7kq4jb4m",
        "AttendeeTypeId": new_type_id,
        "Amount": 0,
        "SendEmail": False,
        "Via": "Auto Transfer",
        "ExternalDescription": "Updated via API"
    }

    post_response = requests.post(post_url, headers=post_headers, json=payload)

    if post_response.status_code == 200:
        print("✅ Successfully updated attendee type!")
        # Wait for 5 seconds before continuing
        return True
    else:
        print(f"❌ Failed to update. Status code: {post_response.status_code}")
        print(post_response.text)
        return False



async def update_attendee_custom_fields(attendee_id, field_object):
    url = f'https://api.brushfire.com/attendees/{attendee_id}/fieldscustom'

    headers = {
        'accept': 'application/json',
        'Authorization': 'wb6fy7pt8gh7km3j',
        'Content-Type': 'application/json',
        'api-version': '2025-02-24'
    }

    payload = {
        "AccessKey": "pr2qd6tb7kq4jb4m",
        "FieldValues": field_object,
        "UpdateNewOnly": True
    }

    response = requests.post(url, headers=headers, json=payload)

    if response.status_code == 200:
        print("✅ Successfully updated custom fields!")
        return True
    else:
        print(f"❌ Failed to update custom fields. Status code: {response.status_code}")
        print(response.text)
        return False

async def confirm_attendee(prompt_message):
    while True:
        attendee_id = input(prompt_message)

        url = f'https://api.brushfire.com/attendees/{attendee_id}/fields?accessKey=pr2qd6tb7kq4jb4m'
        headers = {
            "accept": "application/json",
            "Authorization": "wb6fy7pt8gh7km3j",
            "api-version": "2025-02-24"
        }

        response = requests.get(url, headers=headers)

        if response.status_code == 200:
            data = response.json()

            for field in data:
                if field.get('Label') == "Camper Name (First)":
                    print(f"Is {field.get('Value')} correct? y/n")
                    answer = input()

                    if answer.lower() == 'y':
                        return attendee_id, data  # Return BOTH ID and field data
                    else:
                        print("Let's try again.\n")
        else:
            print(f"Request failed with status code {response.status_code}")
            print(response.text)


async def get_attendee_fields(attendee_id):
    url = f'https://api.brushfire.com/attendees/{attendee_id}/fields?accessKey=pr2qd6tb7kq4jb4m'
    headers = {
        "accept": "application/json",
        "Authorization": "wb6fy7pt8gh7km3j",
        "api-version": "2025-02-24"
    }

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        return response.json()  # Just return the object
    else:
        return None  # You can handle None if you want later
    


def transferAttendee(attendeeRev, attendeeYouth):
    object_list = []

    for revField in attendeeRev:
        for youthField in attendeeYouth:
            if revField.get('Label') == youthField.get('Label'):

                # Check if it's a text field (no Options)
                if not revField.get('Options'):
                    object_list.append({
                        "Id": revField['Id'],
                        "Value": youthField['Value']
                    })
                    break  # Exit the inner loop and proceed to the next revField
                else:
                    # It's an options field (dropdown, checkbox, etc.)
                    selected_options = []

                if youthField.get('Options'):
                    for youthOption in youthField['Options']:
                        if youthField.get('Value') and isinstance(youthField['Value'], list) and youthField['Value']:
                            for youthValue in youthField['Value']:
                                if youthOption['Id'] == youthValue['Id']:
                                    # Find matching option in Rev field
                                    for revOption in revField['Options']:
                                        if revOption.get('Label') == youthOption.get('Label'):
                                            selected_options.append({
                                                "Id": revOption['Id'],
                                                "Quantity": 1,
                                                "Price": 0  # Better to use 0 instead of None
                                            })


                    if selected_options:
                        object_list.append({
                            "Id": revField['Id'],
                            "Value": selected_options
                        })
                    break  # Exit the inner loop and proceed to the next revField

    return object_list







# Get Youth attendee
async def main():
    attendeeIdYouth, attendeeDataYouth = await confirm_attendee("What is the attendee number of the youth registration? ")

    attendeeIdRevCon, attendeeDataRevCon = await confirm_attendee("What is the attendee number of the RevCon registration? ")

    # Await update process before continuing
    Update = await update_attendee_type(attendeeIdRevCon)

    if Update:
        updatedRevConAttendee = await get_attendee_fields(attendeeIdRevCon)

        result = transferAttendee(updatedRevConAttendee, attendeeDataYouth)

        await update_attendee_custom_fields(attendeeIdRevCon, result)

        print("\n✅ Confirmed Attendees:")
        print(f"Youth Attendee ID: {attendeeIdYouth}")
        print(f"RevCon Attendee ID: {attendeeIdRevCon}")
    else:
        print("Update failed, check the ticket type of the RevCon attendee and make sure it is a transfer")

# Run the async main function
asyncio.run(main())
