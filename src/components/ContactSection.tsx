import { useState, type FormEvent } from 'react';
import { Mail, Phone, MessageSquare, MapPin, CheckCircle2 } from 'lucide-react';
import { BRAND_BANNERS, CONTACT_DETAILS } from '../data/missions';
import { validateContactForm, type ContactFormInput } from '../utils/missionLogic';
import { ResilientImage } from './ResilientImage';

const INITIAL_FORM: ContactFormInput = {
  name: '',
  email: '',
  organization: '',
  missionType: 'Blue Moon Lunar Cargo',
  message: '',
};

export function ContactSection() {
  const [form, setForm] = useState<ContactFormInput>(INITIAL_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedRecord, setSubmittedRecord] = useState<ContactFormInput | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validation = validateContactForm(form);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setSubmittedRecord(form);
    setForm(INITIAL_FORM);
  };

  return (
    <>
      <section id="contact" className="py-16 lg:py-24 bg-[#080705] border-t border-[#D4AF37]/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Contact Channels */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] mb-2">
                  Mission Control & Commercial Desk
                </p>
                <h2 className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-tight text-[#F5D77F] mb-4">
                  Contact Us
                </h2>
                <p className="text-base text-[#F3E7C9] leading-relaxed">
                  We&apos;d love to hear from you. If you have mission manifest questions, payload
                  integration inquiries, or need engineering assistance, reach out using the channels
                  below or submit the inquiry form.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-[#D4AF37]/20">
                <a
                  href={`mailto:${CONTACT_DETAILS.email}`}
                  className="flex items-start gap-4 p-4 rounded-lg bg-[#12100C] border border-[#D4AF37]/25 hover:border-[#F5D77F] transition-colors"
                >
                  <Mail className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <h3 className="font-display text-lg font-bold text-[#F5D77F] uppercase">
                      Email
                    </h3>
                    <p className="text-sm text-[#F3E7C9]">{CONTACT_DETAILS.email}</p>
                  </div>
                </a>

                <a
                  href={CONTACT_DETAILS.phoneHref}
                  className="flex items-start gap-4 p-4 rounded-lg bg-[#12100C] border border-[#D4AF37]/25 hover:border-[#F5D77F] transition-colors"
                >
                  <Phone className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <h3 className="font-display text-lg font-bold text-[#F5D77F] uppercase">
                      Phone
                    </h3>
                    <p className="text-sm text-[#F3E7C9] font-mono tabular-nums">
                      {CONTACT_DETAILS.phoneDisplay}
                    </p>
                  </div>
                </a>

                <a
                  href={CONTACT_DETAILS.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-4 p-4 rounded-lg bg-[#12100C] border border-[#D4AF37]/25 hover:border-[#F5D77F] transition-colors"
                >
                  <MessageSquare
                    className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-display text-lg font-bold text-[#F5D77F] uppercase">
                      WhatsApp
                    </h3>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-4 rounded-lg bg-[#12100C] border border-[#D4AF37]/25">
                  <MapPin className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <h3 className="font-display text-lg font-bold text-[#F5D77F] uppercase">
                      Headquarters
                    </h3>
                    <p className="text-sm text-[#F3E7C9]">{CONTACT_DETAILS.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Validated Mission Inquiry Form */}
            <div className="lg:col-span-7 bg-[#12100C] border border-[#D4AF37]/30 rounded-xl p-6 sm:p-10">
              <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase text-[#F5D77F] mb-2">
                Submit Payload or Partner Inquiry
              </h3>
              <p className="text-sm text-[#C5A55A] mb-6">
                Our orbital logistics team responds within one business day.
              </p>

              {submittedRecord && (
                <div
                  role="status"
                  className="mb-6 p-4 rounded-sm bg-[#D4AF37]/15 border border-[#D4AF37]/50 text-[#F5D77F] flex items-start gap-3"
                >
                  <CheckCircle2
                    className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div className="text-sm">
                    <p className="font-semibold text-[#F5D77F]">
                      Inquiry received for {submittedRecord.missionType}
                    </p>
                    <p className="mt-1 text-[#F3E7C9]">
                      Thank you, {submittedRecord.name}. Confirmation details have been logged for{' '}
                      {submittedRecord.email}.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-mono uppercase tracking-wider text-[#E6D39A] mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Dr. Kavita Nair"
                      className="w-full bg-[#080705] border border-[#D4AF37]/30 rounded-sm px-3.5 py-2.5 text-sm text-[#F5D77F] placeholder:text-[#7D6838] focus:outline-none focus:border-[#F5D77F]"
                    />
                    {errors.name && <p className="mt-1.5 text-xs text-[#FBBF24]">{errors.name}</p>}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-mono uppercase tracking-wider text-[#E6D39A] mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="kavita@aerospace.org"
                      className="w-full bg-[#080705] border border-[#D4AF37]/30 rounded-sm px-3.5 py-2.5 text-sm text-[#F5D77F] placeholder:text-[#7D6838] focus:outline-none focus:border-[#F5D77F]"
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-[#FBBF24]">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="contact-org"
                      className="block text-xs font-mono uppercase tracking-wider text-[#E6D39A] mb-2"
                    >
                      Organization
                    </label>
                    <input
                      id="contact-org"
                      type="text"
                      value={form.organization}
                      onChange={(e) => setForm({ ...form, organization: e.target.value })}
                      placeholder="Space Systems Division"
                      className="w-full bg-[#080705] border border-[#D4AF37]/30 rounded-sm px-3.5 py-2.5 text-sm text-[#F5D77F] placeholder:text-[#7D6838] focus:outline-none focus:border-[#F5D77F]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-mission"
                      className="block text-xs font-mono uppercase tracking-wider text-[#E6D39A] mb-2"
                    >
                      Program Interest
                    </label>
                    <select
                      id="contact-mission"
                      value={form.missionType}
                      onChange={(e) => setForm({ ...form, missionType: e.target.value })}
                      className="w-full bg-[#080705] border border-[#D4AF37]/30 rounded-sm px-3.5 py-2.5 text-sm text-[#F5D77F] focus:outline-none focus:border-[#F5D77F]"
                    >
                      <option value="Blue Moon Lunar Cargo">Blue Moon Lunar Cargo (MK1/MK2)</option>
                      <option value="Blue Ring Orbital Mobility">Blue Ring Orbital Mobility</option>
                      <option value="New Glenn Heavy-Lift Launch">New Glenn Heavy-Lift Launch</option>
                      <option value="Commercial LEO Habitat">Commercial LEO Habitat</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-mono uppercase tracking-wider text-[#E6D39A] mb-2"
                  >
                    Mission Requirements *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Target orbit, payload mass, schedule window, or technical inquiry..."
                    className="w-full bg-[#080705] border border-[#D4AF37]/30 rounded-sm px-3.5 py-2.5 text-sm text-[#F5D77F] placeholder:text-[#7D6838] focus:outline-none focus:border-[#F5D77F]"
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-xs text-[#FBBF24]">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-7 py-3 text-xs font-semibold uppercase tracking-wider bg-[#D4AF37] text-[#080705] hover:bg-[#F5D77F] transition-colors rounded-sm cursor-pointer"
                >
                  Send Mission Inquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Full-Width DOWN Showcase Banner */}
      <div className="w-full bg-white border-t border-[#D4AF37]/40 py-2">
        <ResilientImage
          src={BRAND_BANNERS.down}
          alt="DB COLLECTION golden halo and monochrome bottom emblem crest"
          className="w-full max-h-[84vh] object-contain mx-auto block"
        />
      </div>

      {/* Quiet Editorial Footer */}
      <footer className="bg-[#050403] border-t border-[#D4AF37]/25 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="font-display text-lg font-bold uppercase tracking-wide text-[#F5D77F]">
              DB COLLECTION
            </p>
            <p className="text-xs text-[#C5A55A] mt-1">{CONTACT_DETAILS.address}</p>
            <p className="text-xs text-[#E6D39A] mt-1 font-mono">
              CEO: Ranvir Sharma · MD: Sanjay Singh
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-[#E6D39A]">
            <a href="#lunar-landers" className="hover:text-[#F5D77F] transition-colors">
              Lunar Landers
            </a>
            <a href="#blue-ring" className="hover:text-[#F5D77F] transition-colors">
              Blue Ring
            </a>
            <a href="#propulsion" className="hover:text-[#F5D77F] transition-colors">
              Propulsion
            </a>
            <span>{CONTACT_DETAILS.email}</span>
          </div>
        </div>
      </footer>
    </>
  );
}
