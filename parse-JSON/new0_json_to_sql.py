import json
import argparse

def parse_json_record_to_sql(json_record, schema):
    sql_parts = []
    metadata = json_record.get("_metadata_", {})

    for column in schema:
        if column in metadata:
            sql_parts.append(
                f'cast(json_data["_metadata_"]["{column}"] as varchar) as {column.lower()}'
            )
        elif column in json_record:
            sql_parts.append(
                f'cast(json_data["{column}"] as varchar) as {column.lower()}'
            )
        else:
            sql_parts.append(f"NULL as {column.lower()}  -- Column not present in JSON")

    return ",\n".join(sql_parts)

def process_nested_json(json_data, parent_key=""):
    models = {}
    for key, value in json_data.items():
        if key == "_metadata_":
            continue
        if isinstance(value, dict):
            schema = list(value.keys())
            sql_insert_format = parse_json_record_to_sql(value, schema)
            model_name = f"{parent_key}_{key}".strip("_")
            models[model_name] = sql_insert_format
        elif isinstance(value, list) and all(isinstance(item, dict) for item in value):
            schema = list(value[0].keys())
            sql_insert_format = parse_json_record_to_sql(value[0], schema)
            model_name = f"{parent_key}_{key}".strip("_")
            models[model_name] = sql_insert_format
    return models

def generate_master_model(json_record):
    schema = []
    for key in json_record.keys():
        if key != "_metadata_":
            schema.append(key)
    if "_metadata_" in json_record:
        schema.extend(json_record["_metadata_"].keys())
    sql_insert_format = parse_json_record_to_sql(json_record, schema)
    return sql_insert_format


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--json_file",
        type=str,
        required=True,
        help="Path to the JSON file containing records.",
    )

    args = parser.parse_args()

    try:
        with open(args.json_file, "r") as file:
            json_data = json.load(file)
    except FileNotFoundError:
        print(f"Error: File '{args.json_file}' not found.")
        return
    except json.JSONDecodeError:
        print(f"Error: Failed to decode JSON from file '{args.json_file}'.")
        return

    for record in json_data:
        models = process_nested_json(record, parent_key="raw_aladdin")
        for model_name, sql_insert_format in models.items():
            with open(f"{model_name}.sql", "w") as sql_file:
                sql_file.write(sql_insert_format)
                print(f"Generated SQL insert format for {model_name} saved to {model_name}.sql")

        # Generate master model
        master_sql_insert_format = generate_master_model(record)
        with open("raw_aladdin_securitymaster_full.sql", "w") as master_sql_file:
            master_sql_file.write(master_sql_insert_format)
            print("Generated SQL insert format for raw_aladdin_securitymaster_full saved to raw_aladdin_securitymaster_full.sql")

if __name__ == "__main__":
    main()
