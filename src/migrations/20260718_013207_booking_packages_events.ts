import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_room_bookings_booking_status" AS ENUM('tentative', 'confirmed', 'checked-in', 'checked-out', 'cancelled', 'no-show', 'maintenance-block');
  CREATE TYPE "public"."enum_room_bookings_source" AS ENUM('website', 'phone', 'email', 'walk-in', 'booking-com', 'makemytrip', 'agoda', 'other-ota', 'travel-agent', 'club-office');
  CREATE TYPE "public"."enum_room_bookings_guest_category" AS ENUM('member', 'affiliated', 'member-guest', 'visitor', 'tournament');
  CREATE TYPE "public"."enum_packages_eligibility" AS ENUM('member', 'affiliated', 'member-guest', 'visitor');
  CREATE TYPE "public"."enum_packages_pricing_price_basis" AS ENUM('per-person', 'per-couple', 'per-room');
  CREATE TYPE "public"."enum_packages_verification_status" AS ENUM('pending', 'verified');
  CREATE TYPE "public"."enum_event_enquiries_event_type" AS ENUM('corporate-golf-day', 'conference', 'conference-and-golf', 'corporate-offsite', 'private-dinner', 'social-evening', 'other');
  CREATE TYPE "public"."enum_event_enquiries_enquiry_status" AS ENUM('new', 'in-progress', 'confirmed', 'declined', 'closed');
  CREATE TABLE "room_bookings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"reference_title" varchar,
  	"room_id" integer NOT NULL,
  	"units_booked" numeric DEFAULT 1 NOT NULL,
  	"check_in_date" timestamp(3) with time zone NOT NULL,
  	"check_out_date" timestamp(3) with time zone NOT NULL,
  	"booking_status" "enum_room_bookings_booking_status" DEFAULT 'tentative' NOT NULL,
  	"source" "enum_room_bookings_source" DEFAULT 'phone' NOT NULL,
  	"external_reference" varchar,
  	"guest_name" varchar,
  	"mobile" varchar,
  	"email" varchar,
  	"adults" numeric,
  	"children" numeric,
  	"guest_category" "enum_room_bookings_guest_category",
  	"tariff_quoted" numeric,
  	"tariff_note" varchar,
  	"related_enquiry_id" integer,
  	"notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "packages_inclusions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"inclusion" varchar NOT NULL
  );
  
  CREATE TABLE "packages_eligibility" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_packages_eligibility",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "packages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"package_name" varchar NOT NULL,
  	"published" boolean DEFAULT false,
  	"summary" varchar NOT NULL,
  	"nights" numeric NOT NULL,
  	"rounds" numeric NOT NULL,
  	"min_guests" numeric DEFAULT 1,
  	"pricing_price" numeric,
  	"pricing_price_basis" "enum_packages_pricing_price_basis" DEFAULT 'per-person',
  	"pricing_tax_note" varchar,
  	"pricing_effective_date" timestamp(3) with time zone,
  	"pricing_review_date" timestamp(3) with time zone,
  	"image_id" integer,
  	"details" jsonb,
  	"display_order" numeric DEFAULT 0,
  	"verification_status" "enum_packages_verification_status" DEFAULT 'pending' NOT NULL,
  	"verification_verified_by" varchar,
  	"verification_verified_on" timestamp(3) with time zone,
  	"verification_notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "event_enquiries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"event_type" "enum_event_enquiries_event_type" NOT NULL,
  	"organisation" varchar,
  	"preferred_date" timestamp(3) with time zone NOT NULL,
  	"alternative_date" timestamp(3) with time zone,
  	"headcount" numeric NOT NULL,
  	"golfers_count" numeric,
  	"rooms_required" numeric,
  	"catering_required" boolean DEFAULT false,
  	"bar_required" boolean DEFAULT false,
  	"requirements" varchar,
  	"full_name" varchar NOT NULL,
  	"mobile" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"notes" varchar,
  	"enquiry_status" "enum_event_enquiries_enquiry_status" DEFAULT 'new' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "rooms" ADD COLUMN "total_units" numeric DEFAULT 1 NOT NULL;
  ALTER TABLE "room_enquiries" ADD COLUMN "preferred_room_id" integer;
  ALTER TABLE "room_enquiries" ADD COLUMN "package_interest" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "room_bookings_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "packages_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "event_enquiries_id" integer;
  ALTER TABLE "room_bookings" ADD CONSTRAINT "room_bookings_room_id_rooms_id_fk" FOREIGN KEY ("room_id") REFERENCES "public"."rooms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "room_bookings" ADD CONSTRAINT "room_bookings_related_enquiry_id_room_enquiries_id_fk" FOREIGN KEY ("related_enquiry_id") REFERENCES "public"."room_enquiries"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "packages_inclusions" ADD CONSTRAINT "packages_inclusions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."packages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "packages_eligibility" ADD CONSTRAINT "packages_eligibility_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."packages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "packages" ADD CONSTRAINT "packages_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "room_bookings_room_idx" ON "room_bookings" USING btree ("room_id");
  CREATE INDEX "room_bookings_related_enquiry_idx" ON "room_bookings" USING btree ("related_enquiry_id");
  CREATE INDEX "room_bookings_updated_at_idx" ON "room_bookings" USING btree ("updated_at");
  CREATE INDEX "room_bookings_created_at_idx" ON "room_bookings" USING btree ("created_at");
  CREATE INDEX "packages_inclusions_order_idx" ON "packages_inclusions" USING btree ("_order");
  CREATE INDEX "packages_inclusions_parent_id_idx" ON "packages_inclusions" USING btree ("_parent_id");
  CREATE INDEX "packages_eligibility_order_idx" ON "packages_eligibility" USING btree ("order");
  CREATE INDEX "packages_eligibility_parent_idx" ON "packages_eligibility" USING btree ("parent_id");
  CREATE INDEX "packages_image_idx" ON "packages" USING btree ("image_id");
  CREATE INDEX "packages_updated_at_idx" ON "packages" USING btree ("updated_at");
  CREATE INDEX "packages_created_at_idx" ON "packages" USING btree ("created_at");
  CREATE INDEX "event_enquiries_updated_at_idx" ON "event_enquiries" USING btree ("updated_at");
  CREATE INDEX "event_enquiries_created_at_idx" ON "event_enquiries" USING btree ("created_at");
  ALTER TABLE "room_enquiries" ADD CONSTRAINT "room_enquiries_preferred_room_id_rooms_id_fk" FOREIGN KEY ("preferred_room_id") REFERENCES "public"."rooms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_room_bookings_fk" FOREIGN KEY ("room_bookings_id") REFERENCES "public"."room_bookings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_packages_fk" FOREIGN KEY ("packages_id") REFERENCES "public"."packages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_event_enquiries_fk" FOREIGN KEY ("event_enquiries_id") REFERENCES "public"."event_enquiries"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "room_enquiries_preferred_room_idx" ON "room_enquiries" USING btree ("preferred_room_id");
  CREATE INDEX "payload_locked_documents_rels_room_bookings_id_idx" ON "payload_locked_documents_rels" USING btree ("room_bookings_id");
  CREATE INDEX "payload_locked_documents_rels_packages_id_idx" ON "payload_locked_documents_rels" USING btree ("packages_id");
  CREATE INDEX "payload_locked_documents_rels_event_enquiries_id_idx" ON "payload_locked_documents_rels" USING btree ("event_enquiries_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "room_bookings" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "packages_inclusions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "packages_eligibility" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "packages" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "event_enquiries" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "room_bookings" CASCADE;
  DROP TABLE "packages_inclusions" CASCADE;
  DROP TABLE "packages_eligibility" CASCADE;
  DROP TABLE "packages" CASCADE;
  DROP TABLE "event_enquiries" CASCADE;
  ALTER TABLE "room_enquiries" DROP CONSTRAINT "room_enquiries_preferred_room_id_rooms_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_room_bookings_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_packages_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_event_enquiries_fk";
  
  DROP INDEX "room_enquiries_preferred_room_idx";
  DROP INDEX "payload_locked_documents_rels_room_bookings_id_idx";
  DROP INDEX "payload_locked_documents_rels_packages_id_idx";
  DROP INDEX "payload_locked_documents_rels_event_enquiries_id_idx";
  ALTER TABLE "rooms" DROP COLUMN "total_units";
  ALTER TABLE "room_enquiries" DROP COLUMN "preferred_room_id";
  ALTER TABLE "room_enquiries" DROP COLUMN "package_interest";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "room_bookings_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "packages_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "event_enquiries_id";
  DROP TYPE "public"."enum_room_bookings_booking_status";
  DROP TYPE "public"."enum_room_bookings_source";
  DROP TYPE "public"."enum_room_bookings_guest_category";
  DROP TYPE "public"."enum_packages_eligibility";
  DROP TYPE "public"."enum_packages_pricing_price_basis";
  DROP TYPE "public"."enum_packages_verification_status";
  DROP TYPE "public"."enum_event_enquiries_event_type";
  DROP TYPE "public"."enum_event_enquiries_enquiry_status";`)
}
