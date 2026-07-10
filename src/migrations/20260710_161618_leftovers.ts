import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_tournament_registrations_enquiry_status" AS ENUM('new', 'in-progress', 'confirmed', 'declined', 'closed');
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor');
  CREATE TABLE "tournament_registrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tournament_id" integer NOT NULL,
  	"full_name" varchar NOT NULL,
  	"mobile" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"home_club" varchar,
  	"handicap" varchar NOT NULL,
  	"affiliation_details" varchar,
  	"notes" varchar,
  	"enquiry_status" "enum_tournament_registrations_enquiry_status" DEFAULT 'new' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "users" ADD COLUMN "name" varchar;
  ALTER TABLE "users" ADD COLUMN "role" "enum_users_role" DEFAULT 'editor' NOT NULL;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "tournament_registrations_id" integer;
  ALTER TABLE "tournament_registrations" ADD CONSTRAINT "tournament_registrations_tournament_id_tournaments_id_fk" FOREIGN KEY ("tournament_id") REFERENCES "public"."tournaments"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "tournament_registrations_tournament_idx" ON "tournament_registrations" USING btree ("tournament_id");
  CREATE INDEX "tournament_registrations_updated_at_idx" ON "tournament_registrations" USING btree ("updated_at");
  CREATE INDEX "tournament_registrations_created_at_idx" ON "tournament_registrations" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tournament_registrations_fk" FOREIGN KEY ("tournament_registrations_id") REFERENCES "public"."tournament_registrations"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_tournament_registrations_i_idx" ON "payload_locked_documents_rels" USING btree ("tournament_registrations_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "tournament_registrations" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "tournament_registrations" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_tournament_registrations_fk";
  
  DROP INDEX "payload_locked_documents_rels_tournament_registrations_i_idx";
  ALTER TABLE "users" DROP COLUMN "name";
  ALTER TABLE "users" DROP COLUMN "role";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "tournament_registrations_id";
  DROP TYPE "public"."enum_tournament_registrations_enquiry_status";
  DROP TYPE "public"."enum_users_role";`)
}
