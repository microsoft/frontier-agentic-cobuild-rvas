# Data dictionary

## policies.csv

The insurer's policy book, 5,000 synthetic policies. Each row is one insured risk (a home, business premises, a condominium or a car) with its location, how much it is insured for and what it covers. It is the exposure data: it tells you who is insured where and which damage would be covered. Incoming reports must be matched against it, and some reports will not match cleanly.

| Column | Meaning |
| --- | --- |
| policy_id | Policy key, format `POL-000000` |
| customer_ref | Customer key. One customer can hold more than one policy |
| customer_name | Synthetic name |
| product | Home Multi-Risk, Business Multi-Risk, Condominium or Motor Own Damage |
| municipality | Municipality of the insured risk |
| address, lat, lon | Location of the insured risk. Coordinates are synthetic and do not match any real place |
| sum_insured_eur | Insured sum in euros |
| covers_storm | True when storm damage is covered |
| covers_flood | True when flood damage is covered |
| deductible_eur | Deductible |
| vulnerable_customer | True when the customer is flagged as vulnerable |
| channel_preference | Preferred contact channel (information only; nobody is contacted in this exercise) |

## adjusters.csv

The insurer's own claims adjusters (40). Each has a home municipality, skills, a daily visit limit and a start time. Together with the providers, this is the capacity available to inspect and handle claims. Emails in the inbox can say the real situation differs from this file.

| Column | Meaning |
| --- | --- |
| adjuster_id | `ADJ-000` |
| name | Synthetic name |
| base_municipality | Home base |
| skills | Semicolon list: roof, water, structural, motor, large_loss |
| max_visits_per_day | Visit limit per day |
| available_from | First time the adjuster can start |
| languages | `en` or `en;fr` |

## providers.csv

External assistance providers (25), such as roofers, drying specialists, tree removal, pumping, glaziers and structural engineers. Each serves a list of municipalities, has a daily job limit and a response commitment. This is the second half of the capacity. Provider emails in the inbox can say the real situation differs from this file. Two providers share a trading name.

| Column | Meaning |
| --- | --- |
| provider_id | `PRV-000` |
| name | Synthetic trading name |
| trades | Semicolon list: roofing, plumbing_drying, tree_removal, pumping, glazing, structural_engineer |
| municipalities | Semicolon list of municipalities served |
| capacity_jobs_per_day | Jobs per day in normal conditions |
| sla_hours | Response commitment in hours |
| available_from | First time the provider can start |
| status | Status in this file. Provider messages in the inbox can change it |

## hazard_by_municipality.csv

How hard Storm Brenna hit each of the 12 municipalities on the Calder Coast: observed peak wind and 48 hour rainfall, plus a wind and a flood exposure score. It tells you where damage is most likely and where demand will concentrate.

| Column | Meaning |
| --- | --- |
| municipality | Municipality name |
| region | North Calder, Calder Estuary or South Calder |
| peak_gust_kmh, rainfall_mm_48h | Observed values |
| wind_exposure, flood_exposure | Exposure score, 0 to 1 |

## inbox/manifest.csv

An index of the 200 incoming documents in `inbox/`: claim forms, emails, call transcripts, adjuster notes, broker batches, provider and adjuster availability updates, and unrelated mail. Some are digital PDFs or text files and some are scans with tilt, stains or noise. The manifest gives only the arrival time and channel, so it is a list of what arrived and when.

| Column | Meaning |
| --- | --- |
| doc_id | `DOC-0000`, in order of arrival |
| filename | File in `inbox/` |
| received_at | Arrival time |
| channel | portal, email, phone, post, broker or field_app |

The manifest does not say what a document contains. Finding out is part of the exercise.
